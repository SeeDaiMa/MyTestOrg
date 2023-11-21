import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./app.html";
class HelloWorldApp extends LightningElement {
  constructor(...args) {
    super(...args);
    this.msg = '1111';
  }
  /*LWC compiler v3.0.0*/
}
_registerDecorators(HelloWorldApp, {
  fields: ["msg"]
});
export default _registerComponent(HelloWorldApp, {
  tmpl: _tmpl,
  sel: "example-app",
  apiVersion: 59
});