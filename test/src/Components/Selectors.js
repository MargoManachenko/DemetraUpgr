import React from 'react';

const Selectors = (props) => (
    <div className={props.className ? "searchbar" : null}>
        <select name="baseTypeNum" onChange={props.handleTypeChangeSelectors}>
            {!props.search && <option value="0">Choose base equipment type</option>}
            <option value="1" selected={ props.baseTypeNum === "1"}>Livestock equipment</option>
            <option value="2" selected={ props.baseTypeNum === "2"}>Equipment for crop production</option>
            <option value="3" selected={ props.baseTypeNum === "3"}>Equipment for growing and processing grain</option>
            <option value="4" selected={ props.baseTypeNum === "4"}>Sorting agricultural equipment</option>
            <option value="5" selected={ props.baseTypeNum === "5"}>Fisheries equipment</option>
        </select>

        {/*Only for search bar*/}
        {!props.search &&
        <select name="specificTypeNum" disabled="disabled" style={{display: props.baseTypeNum === '0' ? "block" : "none"}}>
            <option value="null">Specific Type</option>
        </select>}
        {/*Only for search bar*/}

        {/*Livestock equipment*/}
        <select name="specificTypeNum" onChange={props.handleTypeChangeSelectors}
                style={{display: props.baseTypeNum === '1' ? "block" : "none"}}>
            <option value="0"> Beekeeping equipment</option>
            <option value="1"> Feed Extruders</option>
            <option value="2"> Poultry equipment</option>
            <option value="3"> Equipment for pig breeding</option>
            <option value="4"> Drinkers and accessories</option>
            <option value="5"> Veterinary equipment</option>
            <option value="6"> Milk analyzers</option>
            <option value="7"> Feed Grades</option>
            <option value="8"> Livestock equipment, general</option>
        </select>

        {/*Equipment for crop production*/}
        <select name="specificTypeNum" onChange={props.handleTypeChangeSelectors}
                style={{display: props.baseTypeNum === '2' ? "block" : "none"}}>
            <option value="0">Biomass Processing Equipment</option>
            <option value="1">Greenhouses</option>
            <option value="2">Greenhouses accessorise</option>
            <option value="3">Automatic watering equipment</option>
            <option value="4">Accessories and spare parts for sprayers</option>
            <option value="5">Equipment for chemical protection and fertilization</option>
            <option value="6">Equipment for crop production, general</option>
        </select>

        {/*Equipment for growing and processing grain*/}
        <select name="specificTypeNum" onChange={props.handleTypeChangeSelectors}
                style={{display: props.baseTypeNum === '3' ? "block" : "none"}}>
            <option value="0">Vibropneumatic tables</option>
            <option value="1">Grain loaders</option>
            <option value="2">Grain Cleaning Machines</option>
            <option value="3">Grain separators</option>
            <option value="4">Laboratory equipment for the grain industry</option>
            <option value="5">Equipment for growing and processing grain, general</option>
        </select>

        {/*Sorting agricultural equipment*/}
        <select name="specificTypeNum" onChange={props.handleTypeChangeSelectors}
                style={{display: props.baseTypeNum === '4' ? "block" : "none"}}>
            <option value="0">Photoseparator</option>
            <option value="1"> Cleaner</option>
            <option value="2"> Garden sieve</option>
            <option value="3">Grain thrower</option>
            <option value="4">Sorting table</option>
            <option value="5">Equipment for growing and processing grain, general</option>
        </select>

        {/*Fisheries equipment*/}
        <select name="specificTypeNum" onChange={props.handleTypeChangeSelectors}
                style={{display: props.baseTypeNum === '5' ? "block" : "none"}}>
            <option value="0">Water softeners</option>
            <option value="1">PH meter</option>
            <option value="2">Oxygenators</option>
            <option value="3">Aerators for reservoirs</option>
            <option value="4">Auto feeders, feeders for fisheries</option>
            <option value="5">Fisheries equipment, general</option>
        </select>
    </div>
);
export default Selectors;