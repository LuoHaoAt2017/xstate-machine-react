import { Row, Col } from "antd";

export function FormLayout({ control }: { control: IControlItem }) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: "column",
      }}
    >
      <Row gutter={12}>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}
