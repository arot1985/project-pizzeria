import {settings, select} from '../settings.js';
class AmountWidget {
  constructor(element) {
    const thisWidget = this;
          
    thisWidget.getElements(element);
    thisWidget.value = settings.amountWidget.defaultValue;
    thisWidget.setValue(thisWidget.input.value);
    thisWidget.initActions();
  }
      
  getElements(element){
    const thisWidget = this;
    
    thisWidget.element = element;
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
  }
    
  announce(){
    const thisWidget =this;
    
    const event = new CustomEvent ('updated', {
      bubbles: true,
    });
    thisWidget.element.dispatchEvent(event);
  }
    
  setValue(value) {
    const thisWidget = this;
    
    const newValue = parseInt(value);
          
    if(newValue != thisWidget.value && !isNaN(newValue) && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax) {
      thisWidget.value = newValue;
      thisWidget.announce();
    }
    
    thisWidget.input.value = thisWidget.value;
  }
    
  initActions (){
    const thisWidget = this;
    thisWidget.input.addEventListener('change',function () {
      thisWidget.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });
    thisWidget.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }
}  

export default AmountWidget;
