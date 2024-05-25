import { Form, Empty, Input, Spin, Table } from "antd";
import { debounce, throttle } from "lodash";

function AppSearch() {
  return (
    <div>
      <SearchForm />
      <SearchList />
    </div>
  );
}

function SearchForm() {
  const debounceSearch = debounce(function (evt) {
    console.log("debounceSearch: ", evt.target.value);
  }, 3000);

  const throttleSearch = throttle(function (evt) {
    console.log("throttleSearch: ", evt.target.value);
  }, 3000);

  return (
    <Form>
      <Form.Item label={"防抖"}>
        <Input onChange={debounceSearch} allowClear />
      </Form.Item>
      <Form.Item label={"节流"}>
        <Input onChange={throttleSearch} allowClear />
      </Form.Item>
    </Form>
  );
}

function SearchList({
  dataSource = [],
  dataLoading = false,
}: {
  dataSource?: any[];
  dataLoading?: boolean;
}) {
  if (dataLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }
  if (!dataSource || dataSource.length === 0) {
    return (
      <div>
        <Empty></Empty>
      </div>
    );
  }
  return (
    <div>
      <Table dataSource={dataSource} />
    </div>
  );
}

export default AppSearch;
