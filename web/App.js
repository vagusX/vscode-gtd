"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ClassDefault_1 = require("./ClassDefault");
const ClassNamed_1 = require("./ClassNamed");
const FunctionDefault_1 = require("./FunctionDefault");
const FunctionNamed_1 = require("./FunctionNamed");
// const LazyComponent = lazy(() => import('./LazyComponent'));
function App() {
    return (<div>
      <ClassDefault_1.default />
      <ClassNamed_1.ClassNamed />
      <FunctionDefault_1.default />
      <FunctionNamed_1.FunctionNamed />
      {/* <Suspense fallback={<h1>Loading</h1>}>
          <LazyComponent />
        </Suspense> */}
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map