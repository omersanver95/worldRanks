import styles from './CountriesTable.module.css'
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import React, { useState } from 'react';
import Link from "next/Link";

const orderBy = (countries, value, direction) => {
   
    if(direction === "asc"){
        return [...countries].sort((a,b) =>  a[value] > b[value] ? 1 : -1 );
    }
    if(direction === "desc"){

        return [...countries].sort((a,b) =>  a[value] > b[value] ? -1 : 1);
    }
    return countries;
}

const SorrtArrow = ({ direction }) => {
    if(!direction){
        return <></>;
    }

    
    if(direction === "desc"){
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit"/>
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit"/>
            </div>
        );
    }        
}

const Countriestable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries, value,direction);

    const switchDirection = () => {
        if(!direction){
            setDirection("desc");

        } else if(direction === "desc"){
            setDirection("asc");

        } else {
        setDirection(null);
        }
    }

    const setvalueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    return (
    <div>
        <div className={styles.heading}>
            <button className={styles.heading_name} onClick={() => setvalueAndDirection('name')}>
                <div>Name</div>
                <SorrtArrow />
            </button>
            
            <button className={styles.heading_population} onClick={() => setvalueAndDirection('population')}>
                <div>Population</div>

                <SorrtArrow direction={direction}/>
            </button>
        </div>

        {orderedCountries.map((country,key) =>  (
            
        <Link href={`/country/${country.alpha3Code}`}>

            <div key={key} className={styles.row}>
                <div className={styles.name}>{country.name}</div>

                <div className={styles.population}>{country.population}</div>
            </div>
        </Link>
        
        ))}
    </div>
    );
};

export default Countriestable;