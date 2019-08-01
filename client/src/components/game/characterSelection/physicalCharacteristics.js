'use strict';
import React, { Component } from 'react';

import Select from '../../misc/select';
import NumberSelect from '../../misc/numberSelect';

const eyeColors = [
  'Brown',
  'Black',
  'Yellow',
  'Light Blue',
  'Green',
  'Orange',
];

const builds = [
  'Muscular',
  'Average',
  'Skinny',
  'Hefty',
];

const skinColors = [
  'Charcoal',
  'Deep Red',
  'Deep Brown',
  'Deep Green',
  'White',
];

const hairColors = [
  'Black',
  'White',
  'Brown',
  'Dark Green',
  'Dark Red',
];

const heights = [
  `5'10"`,
  `5'11"`,
  `6'00"`,
  `6'01"`,
  `6'02"`,
  `6'03"`,
  `6'04"`,
  `6'05"`,
  `6'06"`,
  `6'07"`,
  `6'08"`,
  `6'09"`,
  `6'10"`,
];


const weight = [];

for (let i = 240; i <= 400; i += 5) {
  weight.push(String(i))
}

const maxAge = 85;
const minAge = 18;

const maxWeight = 450;
const minWeight = 200;

const minHeight = `5'10"`;
const maxHeight = `6'11"`;

class PhysicalCharacteristics extends Component {
  constructor(props) {
    super(props);

  }

  change=(id, e) => {
    let value = e.target.value;
    let proceed = true;

    if (id === 'Age'){
      proceed = value <= maxAge && value >= minAge;
    } else if (id === 'Weight') {
      proceed = value <= maxWeight && value >= minWeight;
    }
    
    if (proceed){
      this.props.onChange({
        Key: id,
        Value: value
      })
    }
  }

  render() {
    return (
      <div className='physicalCharacteristics'>
        
        <NumberSelect
          id='Age'
          label='Age'
          value={this.props.stats.Age}
          onChange={this.change}
        />
        <Select
          id='Height'
          label='Height'
          value={this.props.stats.Height}
          onChange={this.change}
          options={heights}
        />
        <NumberSelect
          id='Weight'
          label='Weight'
          value={this.props.stats.Weight}
          onChange={this.change}
          step={5}
        />
        <Select
          id='Build'
          label='Build'
          value={this.props.stats.Build}
          onChange={this.change}
          options={builds}
        />
        <Select
          id='EyeColor'
          label='Eye Color'
          value={this.props.stats.EyeColor}
          onChange={this.change}
          options={eyeColors}
        />
        <Select
          id='SkinColor'
          label='Skin Color'
          value={this.props.stats.SkinColor}
          onChange={this.change}
          options={skinColors}
        />
        <Select
          id='HairColor'
          label='Hair Color'
          value={this.props.stats.HairColor}
          onChange={this.change}
          options={hairColors}
        />

      </div>
    )
  }
}

export default PhysicalCharacteristics;