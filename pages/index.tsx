import { NextPage } from "next";
import { Layout, Button } from "antd";

interface Props {
  userAgent?: string;
}
const { Content } = Layout;
const Page: NextPage<Props> = ({ userAgent }) => {
  return (
    <>
      <Layout>
        <Content>{userAgent}</Content>
        <Button type="primary">一个测试的btn,没有用</Button>
      </Layout>
    </>
  );
};

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};

export default Page;
