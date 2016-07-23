import BetaMaxCore from './betamax-core';
import BetaMaxDom from './betamax-dom';
import BetaMaxFoo from './betamax-foo';

const betamaxCore = new BetaMaxCore({
  renderer: new BetaMaxDom(document.querySelector('#betamax-foo'))
});

betamaxCore.render();
