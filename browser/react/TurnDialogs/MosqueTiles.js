import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/** ------- Game logic routes ------ */
import { tile2LiraFor1Good, tile2LiraToReturn1Assistant } from '../../routes/bonus';

/** ------- Helper functions ------ */
import { mapCoordToLocation, mapLocationToCoord } from '../../utils/board';
import { assistantsOutLocations, getPlayerMosqueTiles, checkMoneyAndGoods, checkWarehouseCondition, checkMoney } from '../../utils/options';

/** ------- Constants -------- */
import { ACTION, MORE_OPTIONS } from '../Modal/turn_types';

/** ------- Component -------- */
class MosqueTiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addText: null,
      assistantReturn: null,
      selectTileGood: null
    }

    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleAbilityClick = this.handleAbilityClick.bind(this);
    this.handleAssistantReturnClick = this.handleAssistantReturnClick.bind(this);
    this.handleAddGoodClick = this.handleAddGoodClick.bind(this);
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
      case '2LiraToReturn1Assistant':
        return this.setState({
          addText: null,
          assistantReturn: true,
          selectTileGood: false
        });
      case 'dieTurnOrRoll':
        return this.setState({
          addText: 'After you roll dice at the Tea House or Black Market, you can roll again if you wish.',
          assistantReturn: false,
          selectTileGood: false
        })
      case '2LiraFor1Good':
        return this.setState({
          addText: null,
          assistantReturn: false,
          selectTileGood: true
        })
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
      const {
        userBonusCards, nextDialog, smallMosqueData, greatMosqueData, merchants, playerId,
        currentPosition, userAssistants, userAbilities, userWheelbarrow
      } = this.props;
      const { addText, assistantReturn, selectTileGood } = this.state;
      const assistantsOut = userAssistants.out;
      const assistantsOutLocationsArray = assistantsOutLocations(assistantsOut);
      const sufficientMoney = checkMoney(userWheelbarrow.money);
      const tileArray = getPlayerMosqueTiles(userAbilities);
      const fruitCondition = checkMoneyAndGoods(userWheelbarrow, 'fruit');
      const fabricCondition = checkMoneyAndGoods(userWheelbarrow, 'fabric');
      const heirloomCondition = checkMoneyAndGoods(userWheelbarrow, 'heirloom');
      const spiceCondition = checkMoneyAndGoods(userWheelbarrow, 'spice');
      const warehouseCondition = checkWarehouseCondition(currentPosition);

      return (
        <div id="turn-dialog-full">
          <div id="text-box">
            <div id="options">
              <div>
                <text>You have acquired {tileArray.length} Mosque tiles.</text>
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
                    <text>{addText}</text>
                  }
                  {
                    assistantReturn &&
                    <div>
                      <text>Select 1 assistant that you want returned. Each return cost 2 Lira.</text>
                      <div>
                        {
                          assistantsOutLocationsArray.map(location => {
                            return <RaisedButton key={location} label={location} style={{margin: 12}} default={true} disabled={!sufficientMoney} onTouchTap={() => this.handleAssistantReturnClick(location)} />
                          })
                        }
                      </div>
                    </div>
                  }
                  {
                    !warehouseCondition && selectTileGood &&
                    <text>You can only buy goods at one of the warehouse locations</text>
                  }
                  {
                    warehouseCondition && selectTileGood &&
                    <div>
                      <text>Select 1 good to add to your wheelbarrow. Each good cost 2 Lira</text>
                      <RaisedButton label='Fabric' style={{margin: 12}} default={true} disabled={!fabricCondition} onTouchTap={() => this.handleAddGoodClick('fabric')} />
                      <RaisedButton label='Fruit' style={{margin: 12}} default={true} disabled={!fruitCondition} onTouchTap={() => this.handleAddGoodClick('fruit')} />
                      <RaisedButton label='Heirloom' style={{margin: 12}} default={true} disabled={!heirloomCondition} onTouchTap={() => this.handleAddGoodClick('heirloom')} />
                      <RaisedButton label='Spice' style={{margin: 12}} default={true} disabled={!spiceCondition} onTouchTap={() => this.handleAddGoodClick('spice')} />
                    </div>
                  }
                </div>
              </div>
            <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(MORE_OPTIONS)} />
          </div>
        </div>
      </div>
    );
  }
}

export default MosqueTiles;
