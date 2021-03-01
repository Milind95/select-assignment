import React, { useState } from 'react';
import Dropdown from '../components/select/dropDown/dropDown';
import { Colors, Components } from '../mockData/mockData';

const Home = () => {
    const [simpleDropdown, setSimpleDropdown] = useState(""); // Set to [] by default for isMultiSelect dropdown
    const [simpleDropdownOptions, setSimpleDropdownOptions] = useState(Colors);
    const [multiSelectDropdown, setMultiSelectDropdown] = useState([]);
    const [multiOptions, setMultiOptions] = useState(Components);
    return (
        <>
            <h4>Dropdown with search</h4>
            <div>
                <Dropdown id="simple-select"
                    labelId="simple-select-label"
                    label="Colours"
                    selectedOption={simpleDropdown}
                    options={simpleDropdownOptions}
                    onChange={(value, options) => {
                        setSimpleDropdown(value);
                        setSimpleDropdownOptions(options);
                    }} />
            </div>

            <div>
                <Dropdown id="multi-select"
                    labelId="multi-select-label"
                    label="Colours"
                    isMultiSelect
                    isSearchable
                    selectedOption={multiSelectDropdown}
                    options={multiOptions}
                    onChange={(selectedOptions, allOptions) => {
                        setMultiSelectDropdown(selectedOptions);
                        setMultiOptions(allOptions);
                    }} />
            </div>
        </>
    );
};

export default Home;