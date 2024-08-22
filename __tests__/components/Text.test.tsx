import { render } from "@testing-library/react-native";

import { Text } from "src/components/Text";

describe("<Text />", () => {
  test("Snapshot", () => {
    const tree = render(<Text>My Text</Text>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
