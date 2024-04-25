import Header from "./header";
import Footer from "./footer";
import Editor from "./editor";
import Designer from "./designer";
import Controls from "./controls";

function Report() {
  return (
    <div className="container">
      <Header />
      <div className="flex justify-between">
        <Controls></Controls>
        <Designer></Designer>
        <Editor></Editor>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Report;
