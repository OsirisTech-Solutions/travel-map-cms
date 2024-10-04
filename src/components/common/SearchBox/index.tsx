import { AutoComplete, Spin } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { AutoCompleteProps } from 'antd/lib';
import { debounce } from 'lodash';
import React from 'react';

type SearchBoxProps = React.PropsWithChildren<AutoCompleteProps<string, BaseOptionType>> & {
  isLoading: boolean;
};
const SearchBox: React.FC<SearchBoxProps> = ({
  isLoading,
  onSearch,
  onSelect,
  options,
  ...props
}) => {
  return (
    <>
      <AutoComplete
        style={{ width: 240 }}
        options={options}
        dropdownRender={(menu) => <div>{isLoading ? <Spin size="small" /> : menu}</div>}
        onSearch={onSearch && debounce(onSearch, 500)}
        onSelect={onSelect}
        placeholder="Tìm kiếm địa điểm"
        {...props}
      />
    </>
  );
};

export default SearchBox;
