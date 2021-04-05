import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutMe from "./AboutMe";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import Header from "./Header";
import Home from "./Home";

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <div>
          <Switch>
            <Route path="/post/:filename" component={BlogPost} />
            <Route path="/about">
              <AboutMe />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
