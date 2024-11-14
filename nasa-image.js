import { LitElement, html, css } from 'lit';

export class NasaCard extends LitElement {
  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alt = '';
    this.secondaryCreator = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      alt: { type: String },
      secondaryCreator: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 240px;
        cursor: pointer;
      }
      .card {
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
      }
      .card:hover {
        background-color: #f0f0f0;
      }
      img {
        width: 240px;
        height: 160px;
        object-fit: cover;
      }
      .details {
        font-size: 14px;
        text-align: center;
      }
      .creator {
        color: gray;
        font-size: 12px;
      }
    `;
  }

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this.openImage}"
        @keydown="${this.onKeyDown}"
        role="button"
        aria-label="${this.alt}"
      >
        <img src="${this.source}" alt="${this.alt}" />
        <div class="details">
          <div>${this.title}</div>
          <div class="creator">${this.secondaryCreator}</div>
        </div>
      </div>
    `;
  }

  openImage() {
    window.open(this.source, '_blank');
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.openImage();
    }
  }

  static get tag() {
    return 'nasa-card';
  }
}

customElements.define(NasaCard.tag, NasaCard);