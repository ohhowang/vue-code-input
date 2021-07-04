import CodeInput from "../components/CodeInput";
import { mount } from "@vue/test-utils";

let wrapper;

describe("code-input", () => {
  beforeEach(() => {
    wrapper = mount(CodeInput);
  });

  it("CodeInput 组件存在", () => {
    expect(wrapper.classes("ink-code-input")).toBe(true);
  });
});
