import { Text, Checkbox, Group, List, ActionIcon, Loader } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";

import "./packing-list.css";

const PackingList = ({ packingList, callBackToDelete, callBackToUpdate }) => {
  const [checkedItems, setCheckedItems] = useState({});

  // Initialize checkedItems with packingList data on component mount
  useEffect(() => {
    if (packingList) {
      const initialCheckedState = packingList.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});
      setCheckedItems(initialCheckedState);
    }
  }, [packingList]);

  if (!packingList) return <Loader color="yellow" size="xl" type="dots" />;
  
  return (
    <List>
      {packingList.map((item) => {
        return (
          <div key={item.id}>
            <Group className="packing-list-content">
              <Checkbox
                checked={checkedItems[item.id] || false}
                label={item.name}
                color="yellow"
                onChange={(event) =>
                  setCheckedItems((prev) => ({
                    ...prev,
                    [item.id]: event.target.checked,
                  }))
                }
              />

              <ActionIcon
                onClick={() => callBackToDelete(item.id)}
                className="packing-transparent-action-icon"
                radius="md"
                size={36}
              >
                <IconTrash className="delete" stroke={1} />
              </ActionIcon>
            </Group>

            {/* // </List.Item> */}
          </div>
        );
      })}
    </List>
  );
};

export default PackingList;
