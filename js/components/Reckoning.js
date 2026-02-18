/**
 * Reckoning section component.
 * Renders the thesis, article clusters, and closing statement
 * that form the site's final argumentative section.
 * @module Reckoning
 */

/** @class Reckoning - Final section with thesis, Frontline article clusters, and closing statement. */
export class Reckoning {
  constructor() {
    this.container = document.querySelector('.reckoning-content');
    if (!this.container) return;
    this.init();
  }

  /** Build and render all reckoning content. */
  init() {
    this.container.appendChild(this.buildThesis());
    this.container.appendChild(this.buildClusters());
    this.container.appendChild(this.buildClose());
  }

  /**
   * Build the thesis blockquote.
   * @returns {HTMLElement}
   */
  buildThesis() {
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'reckoning-thesis';
    blockquote.textContent =
      'In February 2021, NITI Aayog approved the \u20B981,800 crore Great Nicobar project. ' +
      'No public hearing. No consent from the Shompen. No environmental clearance from the ' +
      'communities whose forests would be felled. The game you just played had no winning ' +
      'condition. Neither did they.';
    return blockquote;
  }

  /**
   * Build the three article clusters.
   * @returns {HTMLElement}
   */
  buildClusters() {
    const wrapper = document.createElement('div');
    wrapper.className = 'reckoning-clusters';

    const clusters = [
      {
        title: 'The Ecosystem',
        label: 'What gets destroyed',
        articles: [
          { title: 'A Costly Gamble with Forests, Biodiversity, and Indigenous Rights', id: 'article69158497' },
          { title: 'The Port at Galathea Bay', id: 'article69159231' },
          { title: 'The Saltwater Crocodile and Other Wildlife at Risk', id: 'article69150433' },
          { title: 'Coral Reefs, Marine Ecosystems, Climate Change', id: 'article69158539' },
          { title: 'The Nicobar Macaque: Extinction Risk', id: 'article69352272' }
        ]
      },
      {
        title: 'The People',
        label: 'Who gets erased',
        articles: [
          { title: 'Shompen and Nicobarese: Tribal Rights at Stake', id: 'article70007102' },
          { title: 'The Nicobarese Tribe and the Megaproject', id: 'article69368487' },
          { title: 'The SIA and Shompen Land Rights', id: 'article69858021' },
          { title: 'Interview: D. Ayyappan on Tribal Rights', id: 'article69464236' }
        ]
      },
      {
        title: 'The Language',
        label: 'The deepest loss',
        articles: [
          { title: 'Linguicide: When the Land Goes, the Language Dies', id: 'article70420227' }
        ]
      }
    ];

    clusters.forEach(cluster => {
      wrapper.appendChild(this.buildCluster(cluster));
    });

    return wrapper;
  }

  /**
   * Build a single cluster group.
   * @param {{title: string, label: string, articles: Array<{title: string, id: string}>}} cluster
   * @returns {HTMLElement}
   */
  buildCluster(cluster) {
    const section = document.createElement('div');
    section.className = 'reckoning-cluster';

    const heading = document.createElement('h3');
    heading.textContent = cluster.title;
    section.appendChild(heading);

    const label = document.createElement('span');
    label.className = 'cluster-label';
    label.textContent = cluster.label;
    section.appendChild(label);

    const list = document.createElement('div');
    list.className = 'cluster-articles';

    cluster.articles.forEach(article => {
      list.appendChild(this.buildArticleCard(article));
    });

    section.appendChild(list);
    return section;
  }

  /**
   * Build a single article card.
   * @param {{title: string, id: string}} article
   * @returns {HTMLElement}
   */
  buildArticleCard(article) {
    const card = document.createElement('a');
    card.className = 'article-card';
    card.href = `https://frontline.thehindu.com/the-nation/${article.id}/`;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const title = document.createElement('span');
    title.className = 'article-title';
    title.textContent = article.title;
    card.appendChild(title);

    const arrow = document.createElement('span');
    arrow.className = 'article-link';
    arrow.textContent = 'Read on Frontline \u2192';
    card.appendChild(arrow);

    return card;
  }

  /**
   * Build the closing statement.
   * @returns {HTMLElement}
   */
  buildClose() {
    const close = document.createElement('div');
    close.className = 'reckoning-close';
    close.innerHTML =
      '<p>The Shompen have lived on this island for over 10,000 years.</p>' +
      '<p>They were never asked.</p>';
    return close;
  }
}
