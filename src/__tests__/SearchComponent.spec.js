import { shallowMount } from "@vue/test-utils";
import SearchComponent from "../components/SearchComponent";
import { nodes } from "../data";

describe("SearchComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchComponent);
  });

  it("renders input with correct placeholder", () => {
    const input = wrapper.find("input.search-input");
    const searchIcon = wrapper.find("i.material-icons.search-icon");
    expect(input.attributes().placeholder).toBe("Add new node...");
    expect(searchIcon.exists()).toBe(true);
  });

  it("renders list of nodes correctly", () => {
    const list = wrapper.find("ul.search-results");
    const listItems = wrapper.findAll("ul.search-results li");
    expect(list.exists()).toBe(true);
    expect(listItems.length).toBe(6);
    expect(listItems.at(0)?.text()).toBe(nodes[0].type);
  });

  it('shows "No matching nodes found" when no nodes match search term', async () => {
    wrapper.vm.searchTerm = "unmatched value";
    await wrapper.vm.$nextTick();
    const list = wrapper.find("ul.search-results");
    const listItems = wrapper.findAll("ul.search-results li");
    expect(list.exists()).toBe(true);
    expect(listItems.length).toBe(1);
    expect(listItems.at(0)?.text()).toBe("No matching nodes found ...");
  });

  it('dispatches "addNode" event with selected node data when clicking on the node option', async () => {
    const selectNodeSpy = jest.spyOn(wrapper.vm, "selectNode");
    const dispatchEventSpy = jest.spyOn(window, "dispatchEvent");
    wrapper.find("li").trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectNodeSpy).toHaveBeenCalledWith(nodes[0]);
    const event = new CustomEvent("addNode", { detail: nodes[0] });
    expect(dispatchEventSpy).toHaveBeenCalledWith(event);
  });
});
