import React from 'react';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Player from './Player';
import Assistant from './Assistant';

describe('Board Game Pieces', function () {

  describe('Player', () => {

    describe('visual content', () => {

      let playerWrapper, testPlayerNum;
      const OriginalPlayerComponent = Player.DecoratedComponent;
      const identity = el => el;
      beforeEach('Create <Player /> wrapper', () => {
          testPlayerNum = 0;
          playerWrapper = shallow(<OriginalPlayerComponent playerNum={testPlayerNum} connectDragSource={identity} />);
      });

      it('includes "images/player/redplayer.png" as img source', () => {
          expect(playerWrapper.find('img')).to.have.html('<img src="images/player/redplayer.png" class="player-icon"/>');
      });

      it('is not hardcoded', () => {
          const diffPlayerNum = 2;

          const differentPlayerWrapper = shallow(<OriginalPlayerComponent playerNum={diffPlayerNum} connectDragSource={identity} />);
          expect(differentPlayerWrapper.find('img')).to.have.html('<img src="images/player/greenplayer.png" class="player-icon"/>');
      });

    });

  });

  describe('Assistant', () => {

    describe('visual content', () => {

      let assistantWrapper, testPlayerNum;
      beforeEach('Create <ASsistant /> wrapper', () => {
          testPlayerNum = 1;
          assistantWrapper = shallow(<Assistant playerNum={testPlayerNum} />);
      });

      it('includes "images/player/blueplayer-assistant" as img source', () => {
          expect(assistantWrapper.find('img')).to.have.html('<img src="images/player/blueplayer-assistant.png" class="assistant-icon"/>');
      });

      it('is not hardcoded', () => {
          const diffPlayerNum = 3;

          const differentAssistantWrapper = shallow(<Assistant playerNum={diffPlayerNum} />);
          expect(differentAssistantWrapper.find('img')).to.have.html('<img src="images/player/yellowplayer-assistant.png" class="assistant-icon"/>');
      });

    });

  });

})
