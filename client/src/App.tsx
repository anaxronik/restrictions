import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useState } from "react";

type Option = {
  code: string;
  description: string;
};

function App() {
  const [value, setValue] = useState<Option | null>(null);
  const [items, setItems] = useState<Option[]>([]);

  const search = async (event: AutoCompleteCompleteEvent) => {
    return fetch(`http://localhost:3000/tnwed/search`, {
      body: JSON.stringify({ query: event.query }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  };

  return (
    <div>
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
        field="description"
        itemTemplate={(item) => (
          <div>
            <strong>{item.code}</strong> - {item.description}
          </div>
        )}
      />
    </div>
  );
}

export default App;
