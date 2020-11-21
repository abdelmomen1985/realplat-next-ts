import * as React from "react";
import ListItem from "./ListItem";
import { User } from "../interfaces";
import { Button } from "@material-ui/core";

type Props = {
  items: User[];
};

export default function List({ items }: Props) {
  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ListItem data={item} />
          </li>
        ))}
      </ul>
      <Button variant="contained">Hello</Button>
    </>
  );
}
