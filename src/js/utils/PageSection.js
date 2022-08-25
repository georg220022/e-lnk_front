class PageSection { 
	constructor(id) {
  	this.id = document.getElementById(id);
  }

  renderComponent(component) {
    this.id.innerHTML = component;
  }
};

export default PageSection;