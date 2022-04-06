import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const activeItem = "home";

  return (
    <Menu inverted>
      <Menu.Item name="home" active={activeItem === "home"} />
      <Menu.Item name="messages" active={activeItem === "messages"} />
      <Menu.Item name="friends" active={activeItem === "friends"} />
    </Menu>
  );
}
