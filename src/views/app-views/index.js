import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        />
        {/* <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} /> */}

        {/* Charity Routes  */}

        <Route
          path={`${APP_PREFIX_PATH}/charity/edit/:id`}
          component={lazy(() => import(`./charity/edit`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/charity/add`}
          component={lazy(() => import(`./charity/add`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/charity`}
          component={lazy(() => import(`./charity`))}
        />
        {/* Sponser Routes  */}

        <Route
          path={`${APP_PREFIX_PATH}/sponsor/edit/:id`}
          component={lazy(() => import(`./sponsor/edit`))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/sponsor/add`}
          component={lazy(() => import(`./sponsor/add`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/sponsor`}
          component={lazy(() => import(`./sponsor`))}
        />

        {/* Feed Routes  */}

        <Route
          path={`${APP_PREFIX_PATH}/feed/edit`}
          component={lazy(() => import(`./feed/edit`))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/feed/add`}
          component={lazy(() => import(`./feed/add`))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/feed`}
          component={lazy(() => import(`./feed`))}
        />

        {/* Tournament Routes  */}

        <Route
          path={`${APP_PREFIX_PATH}/feed/edit`}
          component={lazy(() => import(`./feed/edit`))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/feed/add`}
          component={lazy(() => import(`./feed/add`))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/tournament`}
          component={lazy(() => import(`./tournament`))}
        />

        {/* <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/charity`} /> */}
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
