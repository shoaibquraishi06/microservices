const { StateGraph, MessagesAnnotation } = require("@langchain/langgraph");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const {
  ToolMessage,
  AIMessage,
  HumanMessage,
} = require("@langchain/core/messages");
const tools = require("./tools");

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
  temperature: 0.5,
});

const graph = new StateGraph(MessagesAnnotation)
  .addNode("tools", async (state, config) => {
    const lastMessage = state.messages[state.messages.length - 1];

    const toolsCall = lastMessage.tool_calls;

    const toolCallResults = await Promise.all(
      toolsCall.map(async (call) => {
        const tool = tools[call.name];
      if (!tool) {
  return new ToolMessage({
    content: `Tool ${call.name} is not available. Available tools are: searchProduct, addProductToCart.`,
    name: call.name,
    tool_call_id: call.id,
  });
}
        const toolInput = call.args;

        console.log("Invoking tool:", call.name, "with input:", call);

        const toolResult = await tool.func({
          ...toolInput,
          token: config.metadata.token,
        });

        return new ToolMessage({
          content: toolResult,
          name: call.name,
          tool_call_id: call.id,
        });
      }),
    );

    state.messages.push(...toolCallResults);

    return state;
  })
  .addNode("chat", async (state, config) => {
    console.log("MESSAGES SENT TO GEMINI:", state.messages);
    const response = await model.invoke(state.messages, {
      tools: [tools.searchProduct, tools.addProductToCart],
    });
    console.log("GEMINI RESPONSE:", response);

    state.messages.push(
      new AIMessage({
        content: response.text,
        tool_calls: response.tool_calls,
      }),
    );

    return state;
  })
  .addEdge("__start__", "chat")
  .addConditionalEdges("chat", async (state) => {
    const lastMessage = state.messages[state.messages.length - 1];

    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
      return "tools";
    } else {
      return "__end__";
    }
  })
  .addEdge("tools", "chat");

const agent = graph.compile();

module.exports = agent;
