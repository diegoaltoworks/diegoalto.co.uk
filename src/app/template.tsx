"use client"
import React from "react";
import { HomeOutlined, LoginOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { constants } from "@/lib/constants";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = ({ children }: React.PropsWithChildren) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	
	return (
		<Layout style={{minHeight:"100vh"}}>
			<Layout style={{minHeight:"100%"}}>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<img src="/logo.jpg" alt="logo" style={{ width: "50px", height: "50px" }} />
				</Header>
				<Content style={{ margin: "24px 16px 0"}}>
					<div 
						style={{
							padding: 24,
							minHeight: 360,
							height: "100%",
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} {constants.title}
				</Footer>
			</Layout>
			<Sider
				breakpoint="md"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
				reverseArrow
			>
				<div className="demo-logo-vertical" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={[
					{ key: 1, label: <Link href="/">Home</Link>, icon: <HomeOutlined />},
					{ key: 2, label: <Link href="/about">About</Link>, icon: <UserOutlined/>},
					{ key: 3, label: <Link href="/contact">Contact</Link>, icon: <MessageOutlined />},
					{ key: 4, label: <Link href="/login">Login</Link>, icon: <LoginOutlined />},
				]} />
			</Sider>
		</Layout>
	);
};

export default App;
