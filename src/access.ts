/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
//   const {currentUser} = initialState || {};
//   return {
//     canUser: currentUser?.data,
//     canAdmin: currentUser?.data?.userRole === 'admin',
//   };
// }

export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    canAdmin: loginUser?.userRole === 'admin',
  };
}

