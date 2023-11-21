import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./notFound.html";
class HelloWorldApp extends LightningElement {
  constructor(...args) {
    super(...args);
    this.msg = 'notFound';
  }
  /*LWC compiler v3.0.0*/
}
_registerDecorators(HelloWorldApp, {
  fields: ["msg"]
});
export default _registerComponent(HelloWorldApp, {
  tmpl: _tmpl,
  sel: "example-not-found",
  apiVersion: 59
});