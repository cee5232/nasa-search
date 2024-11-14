import { LitElement, html, css } from 'lit';
import './lib/nasa-card.js';

export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .results {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.value = '';
    this.title = 'NASA Image Search';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <input
        id="input"
        placeholder="Search NASA images"
        @input="${this.inputChanged}"
      />
      <div class="results">
        ${this.items.map(
          (item) => html`
            <nasa-card
              source="${item.links[0].href}"
              title="${item.data[0].title}"
              alt="${item.data[0].description || 'NASA image'}"
              secondaryCreator="${item.data[0].secondary_creator || 'Unknown'}"
            ></nasa-card>
          `
        )}
      </div>
    `;
  }

  inputChanged(e) {
    this.value = e.target.value;
  }

  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.collection) {
          this.items = data.collection.items;
        }
        this.loading = false;
      });
  }

  static get tag() {
    return 'nasa-search';
  }
}

customElements.define(NasaSearch.tag, NasaSearch);