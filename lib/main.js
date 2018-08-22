const {CompositeDisposable, Disposable} = require('via');
const StatusBarView = require('./status-bar-view');

class StatusBar {
    initialize(){
        console.log('INITIALIZING STATUS BAR')
        this.subscriptions = new CompositeDisposable();
        this.statusBar = new StatusBarView();
        this.attachStatusBar();
    }

    deactivate(){
        if(this.statusBarPanel){
            this.statusBarPanel.destroy();
            this.statusBarPanel = null;
        }

        if(this.statusBar){
            this.statusBar.destroy();
            this.statusBar = null;
        }

        this.subscriptions.dispose();
        this.subscriptions = null;
    }

    provideStatusBar(){
        return this.statusBar;
    }

    attachStatusBar(){
        if(this.statusBarPanel){
            this.statusBarPanel.destroy();
        }

        this.statusBarPanel = via.workspace.addBottomPanel({item: this.statusBar.element, priority: 1, className: 'status-bar-panel'});
    }
}

module.exports = new StatusBar();
