import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import Login from 'Login';
import Quiz from 'Quiz/Quiz';

var requireQuizId = (nextState, replace, next) => {
  if (!nextState.params.id) {
    console.log("Quiz ID is not defined");
  }
  next();
}

var sendToHome = (nextState, replace, next) => {
  replace('/');
  next();
}

export default (
  <Router history={browserHistory}>
    <Route path="/">
      <Route path="quiz/:id" component={Quiz} onEnter={requireQuizId} />
      <Route path="teste">
          <Route path="quiz" component={Quiz} />
          <IndexRoute component={Login} />
      </Route>
      <Route path="*" component={Login} onEnter={sendToHome} />
      <IndexRoute component={Login}/>
    </Route>
  </Router>
);
