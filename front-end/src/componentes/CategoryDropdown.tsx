import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CategoryDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Infantil');
  const [items, setItems] = useState([
    { label: 'Infantil', value: 'Infantil' },
    { label: 'Personas mayores', value: 'Personas mayores' },
    { label: 'Otros', value: 'Otros' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={pickerSelectStyles.dropdown}
      textStyle={pickerSelectStyles.dropdownText}
      dropDownContainerStyle={pickerSelectStyles.dropdownContainer}
      flatListProps={{ nestedScrollEnabled: true, scrollEnabled: false }}
    />
  );
};

export default CategoryDropdown;

const pickerSelectStyles = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    borderColor: '#ff9900',
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: '#ff9900',
    borderRadius: 10,
  },
});
