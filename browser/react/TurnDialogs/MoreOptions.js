import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { bonusFiveLira, tile2LiraToReturn1Assistant, tile2LiraFor1Good } from '../../routes/bonus';

import { mapCoordToLocation, mapLocationToCoord } from '../../utils/board';

/** ------- Constants -------- */
import { SELECT_BONUS_GOOD } from '../Modal/turn_types';

class MoreOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addText: null,
      assistantReturn: null,
      selectTileGood: null
    }

    this.handleBonusFiveLiraClick = this.handleBonusFiveLiraClick.bind(this);
    this.handleBonusOneGoodClick = this.handleBonusOneGoodClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleAbilityClick = this.handleAbilityClick.bind(this);
    this.handleAssistantReturnClick = this.handleAssistantReturnClick.bind(this);
  }

  handleBonusFiveLiraClick(numFiveLira) {
    const { gameId, playerId } = this.props;
    if (numFiveLira > 0) {
      bonusFiveLira(gameId, playerId)
      .catch(console.error)
    } else {
      alert('You do not have any Lira bonus card.') // to be refactored, conditional rendering
    }
  }

  handleBonusOneGoodClick(numOneGood) {
    const { openModal, closeModal, currentPosition } = this.props;
    if (numOneGood > 0) {
      closeModal();
      openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: SELECT_BONUS_GOOD });
    } else {
      alert('You do not have any Goods bonus card.') // to be refactored, conditional rendering
    }
  }

  handleGoBackClick(nextDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
  }

  handleAbilityClick(ability){
    switch (ability){
      case 'add1Assistant':
        return this.setState({
          addText: 'Your 5th assistant is already added.',
          assistantReturn: false,
          selectTileGood: false
        });
        break;
      case '2LiraToReturn1Assistant':
        return this.setState({
          addText: null,
          assistantReturn: true,
          selectTileGood: false
        });
        break;
      case 'dieTurnOrRoll':
        break;
      case '2LiraFor1Good':
        return this.setState({
          addText: null,
          assistantReturn: false,
          selectTileGood: true
        })
        break;
      default:
        return;
    }
  }

  handleAssistantReturnClick(location){
    const { gameId, playerId } = this.props;
    const assistantCoords = mapLocationToCoord(location);
    tile2LiraToReturn1Assistant(gameId, playerId, assistantCoords)
      .catch(console.error)
  }

  handleAddGoodClick(selectedGood){
    const { gameId, playerId } = this.props;
    tile2LiraFor1Good(gameId, playerId, selectedGood)
      .catch(console.error)
  }

  render() {
    const { userBonusCards, nextDialog, smallMosqueData, greatMosqueData, merchants, playerId } = this.props;
    const playerAbilities = merchants[playerId].abilities;
    const addText = this.state.addText;
    const assistantReturn = this.state.assistantReturn;
    const selectTileGood = this.state.selectTileGood;
    const assistantsOut = merchants[playerId].assistants.out;
    const money = merchants[playerId].wheelbarrow.money;
    const wheelbarrow = merchants[playerId].wheelbarrow;

    let abilityCount = 0, tileArray = [], assistantsOutLocations = [], sufficientMoney = false;
    let fruitCondition = false, fabricCondition = false, heirloomCondition = false, spiceCondition = false;

    for(let ability in playerAbilities){
      if(playerAbilities[ability].acquired){
        abilityCount++;
        tileArray.push(playerAbilities[ability]);
      }
    }

    for(let assistant in assistantsOut){
      assistantsOutLocations.push(mapCoordToLocation(assistantsOut[assistant]).split('_').join(' ').toLowerCase());
    }

    if(money >= 2){
      sufficientMoney = true;
    }
    else sufficientMoney = false;

    if(sufficientMoney && wheelbarrow.fabric < wheelbarrow.size) fabricCondition = true;
    else fruitCondition = false;
    if(sufficientMoney && wheelbarrow.fruit < wheelbarrow.size) fruitCondition = true;
    else fruitCondition = false;
    if(sufficientMoney && wheelbarrow.heirloom < wheelbarrow.size) heirloomCondition = true;
    else fruitCondition = false;
    if(sufficientMoney && wheelbarrow.spice < wheelbarrow.size) spiceCondition = true;
    else fruitCondition = false;

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          {
            !userBonusCards.oneGood && !userBonusCards.fiveLira && !abilityCount ?
            <div>
              <p>You do not have any bonus cards or mosque tiles.</p>
              <RaisedButton label="Go back"
                style={{ margin: 12 }}
                primary={true}
                onTouchTap={() => this.handleGoBackClick(nextDialog)}
              />
            </div>
            :
            <div id="options">
              <div>
                <p>Select the card you want to play.<br /><br />You have {`${userBonusCards.oneGood}`} Goods cards and {`${userBonusCards.fiveLira}`} Lira cards.</p>
                <div id="bonus-row">
                  <div>
                    {
                      <img src="./images/bonus_cards/one-good.png" onTouchTap={() => this.handleBonusOneGoodClick(userBonusCards.oneGood)} />
                    }
                  </div>
                  <div>
                    {
                      <img src="./images/bonus_cards/five-lira.png" onTouchTap={() => this.handleBonusFiveLiraClick(userBonusCards.fiveLira) } />
                    }
                  </div>
                </div>
              </div>
              <div>
                <p>You have acquired {abilityCount} Mosque tiles.</p>
                <div id="bonus-row">
                  {
                    tileArray !== [] && tileArray.map((tile, idx) => {
                      return (
                        <img key={idx} src={tile.img} onTouchTap={() => this.handleAbilityClick(tile.ability) } />
                      )
                    })
                  }
                </div>
                <div id="more-options-text">
                  {
                    addText &&
                    <p>{addText}</p>
                  }
                  {
                    assistantReturn &&
                    <div>
                      <p>Select 1 assistant that you want returned. Each return cost 2 Lira.</p>
                      <div>
                        {
                          assistantsOutLocations.map(location => {
                            return <RaisedButton key={location} label={location} style={{margin: 12}} default={true} disabled={!sufficientMoney} onTouchTap={() => this.handleAssistantReturnClick(location)} />
                          })
                        }
                      </div>
                    </div>
                  }
                  {
                    selectTileGood &&
                    <div>
                      <p>Select 1 good to add to your wheelbarrow. Each good cost 2 Lira</p>
                      <RaisedButton label='Fabric' style={{margin: 12}} default={true} disabled={!fabricCondition} onTouchTap={() => this.handleAddGoodClick('fabric')} />
                      <RaisedButton label='Fruit' style={{margin: 12}} default={true} disabled={!fruitCondition} onTouchTap={() => this.handleAddGoodClick('fruit')} />
                      <RaisedButton label='Heirloom' style={{margin: 12}} default={true} disabled={!heirloomCondition} onTouchTap={() => this.handleAddGoodClick('heirloom')} />
                      <RaisedButton label='Spice' style={{margin: 12}} default={true} disabled={!spiceCondition} onTouchTap={() => this.handleAddGoodClick('spice')} />
                    </div>
                  }
                </div>
              </div>
              <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(nextDialog)} />
            </div>
          }
      </div>
    </div>
    );
  }
};

export default MoreOptions;
