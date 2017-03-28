import React from 'react';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Cell from './Cell';

describe('Board Cell Tests', function () {

  describe('Cell', () => {

    describe('visual content', () => {

//       let cellWrapper, testCoords, testName;
//       beforeEach('Create <Cell /> wrapper', () => {
//           testCoords = "0,0";
//           testName = "Great_Mosque"
//           cellWrapper = shallow(<Cell coords={testCoords} name={testName} />);
//       });

//       it('includes coordinates "0,0" as text', () => {
//           expect(cellWrapper.find('text')).to.have.html('<text class="cell-text">0,0</text>');
//       });

//       it('includes name used as img source', () => {
//           expect(cellWrapper.find('img')).to.have.html('<img src="images/locations/Great_Mosque.jpg" class="img-location"/>');
//       });

//       it('is not hardcoded', () => {
//           const differentCoords = "0,1";
//           const differentName = "Caravansary";

//           const differentCellWrapper = shallow(<Cell coords={differentCoords} name={differentName} />);
//           expect(differentCellWrapper.find('text')).to.have.html('<text class="cell-text">0,1</text>');
//           expect(differentCellWrapper.find('img')).to.have.html('<img src="images/locations/Caravansary.jpg" class="img-location"/>');
//       });

    });

    describe('interactivity', () => {

      let cellWrapper, handleOnClick;
      beforeEach('Create <Cell />', () => {
          handleOnClick = spy();
          cellWrapper = shallow(<Cell handleOnClick={handleOnClick} />);
      });

      it('when clicked, invokes a function passed in as the handleOnClick property', () => {

          // This will trigger any onClick handlers registered to the component.
          cellWrapper.simulate('click');

          expect(handleOnClick.called).to.be.true;

      });

    });

  });

})
