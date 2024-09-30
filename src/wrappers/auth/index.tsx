import { Outlet } from "@umijs/max";

export default () => {
  console.log('auth wrapper');
    return <Outlet />;
}