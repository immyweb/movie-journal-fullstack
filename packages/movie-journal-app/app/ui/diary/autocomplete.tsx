import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedCallback } from 'use-debounce';
import { fetchSearchResults } from '../../lib/data';

type Result = {
  id: string;
  title: string;
};

export default function AutoComplete() {
  const [value, setValue] = useState('');
  const [data, setData] = useState<Result[] | null>(null);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const fetchOptions = async (query: string) => {
    const searchResults = await fetchSearchResults(query);
    setData(searchResults);
  };

  const debounced = useDebouncedCallback((value) => {
    fetchOptions(value);
  }, 500);

  const options = (data || []).map((result: Result) => (
    <Combobox.Option value={result.title} key={result.id}>
      {result.title}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Movie"
          placeholder="Search movies..."
          id="film"
          name="film"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            debounced(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              debounced(value);
            }
          }}
          onBlur={() => combobox.closeDropdown()}
          // rightSection={loading && <Loader size={18} />}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options>
          {options}
          {data === null && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
