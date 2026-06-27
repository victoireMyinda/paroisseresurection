import type { ChurchSectionId } from '@/config/navigation'
import type { ChurchSectionContent } from '@/i18n/content/types'

export const churchEn: Record<ChurchSectionId, ChurchSectionContent> = {
  histoire: {
    title: 'History of the Catholic Church',
    subtitle: 'From Jesus Christ to the universal Church today',
    blocks: [
      {
        heading: 'Apostolic origins',
        paragraphs: [
          'The Catholic Church originates in Jesus Christ, Son of God made man, who died and rose for the salvation of the world. Before returning to the Father, the Lord entrusted the apostles with proclaiming the Gospel and administering the sacraments.',
          'Peter, to whom Jesus entrusted the keys of the Kingdom, and the other apostles laid the foundations of the Church. Their succession, ensured by bishops in communion with the Pope, guarantees fidelity to the faith through the centuries.',
        ],
      },
      {
        heading: 'Expansion and mission',
        paragraphs: [
          'From Jerusalem to Rome, from Africa to Asia and the Americas, the Church spread by proclaiming Christ crucified and risen. Martyrs, saints, missionaries and teachers transmitted the faith received from the apostles.',
          'In the Democratic Republic of Congo, the Gospel was received with fervour. The Church accompanies the Congolese people in faith, education, health and the promotion of justice and peace.',
        ],
      },
      {
        heading: 'The Church today',
        paragraphs: [
          'The Catholic Church has more than one billion faithful worldwide. It is one, holy, catholic and apostolic. Guided by the Holy Spirit, it remains faithful to the Word of God and the living tradition handed down from the apostles.',
        ],
      },
    ],
  },
  sacrements: {
    title: 'The Sacraments',
    subtitle: 'Visible signs of God\'s invisible grace',
    blocks: [
      {
        heading: 'What is a sacrament?',
        paragraphs: [
          'Sacraments are rites instituted by Christ and entrusted to the Church. They are effective signs of grace: they sanctify the faithful, build up the Body of Christ and give worship to God.',
        ],
      },
      {
        heading: 'The seven sacraments',
        paragraphs: [
          'Baptism: entry into divine life and the Christian community.',
          'Confirmation: strengthening of baptism through the gift of the Holy Spirit.',
          'Eucharist: source and summit of Christian life, the Body and Blood of Christ.',
          'Reconciliation: forgiveness of sins and reconciliation with God and the Church.',
          'Anointing of the Sick: strength and comfort in illness.',
          'Holy Orders: consecration of bishops, priests and deacons for service to the community.',
          'Matrimony: indissoluble covenant between a man and a woman, sign of Christ\'s love for his Church.',
        ],
      },
    ],
  },
  liturgie: {
    title: 'The Liturgy',
    subtitle: 'Public and official celebration of divine worship',
    blocks: [
      {
        heading: 'The mystery celebrated',
        paragraphs: [
          'The liturgy is the action of Christ and his Body, the Church. In the Eucharistic celebration, the sacrifice of the Cross is made present sacramentally. The faithful participate actively by offering their lives with Christ\'s.',
        ],
      },
      {
        heading: 'Elements of celebration',
        paragraphs: [
          'The Word of God proclaimed, the prayers of the assembly, hymns, ritual gestures and sacraments make up the liturgy. Each element has its place and meaning in the action of grace offered to the Father.',
        ],
      },
    ],
  },
  'temps-liturgique': {
    title: 'The Liturgical Year',
    subtitle: 'The Christian year in the rhythm of Christ\'s mystery',
    blocks: [
      {
        paragraphs: [
          'The liturgical year follows the mystery of Christ: his coming (Advent and Christmas), his manifestation (Epiphany), his passion and resurrection (Lent and Easter), the sending of the Spirit (Pentecost) and Ordinary Time to deepen Christian life.',
          'Each season has its liturgical colour, proper readings and particular spirituality that nourishes the faith of the faithful.',
        ],
      },
    ],
  },
  fetes: {
    title: 'Christian Feasts',
    subtitle: 'The great solemnities of the year',
    blocks: [
      {
        paragraphs: [
          'Christmas: birth of the Saviour. Easter: victory of life over death. Pentecost: gift of the Holy Spirit to the Church. Assumption and All Saints: glory of the saints in heaven.',
          'Marian feasts (Annunciation, Immaculate Conception, Nativity of Mary) honour the Mother of God. Feasts of the apostles and patron saints recall the communion of saints.',
        ],
      },
    ],
  },
  saints: {
    title: 'The Saints',
    subtitle: 'Witnesses to God\'s glory and models of Christian life',
    blocks: [
      {
        paragraphs: [
          'Saints are men and women who lived in communion with God and whose holiness is officially recognised by the Church. They intercede for us and inspire us on our journey to heaven.',
          'The Virgin Mary, Mother of God and Mother of the Church, holds a unique place. Martyrs, confessors, virgins and saints of our time show the diversity of vocations in the Kingdom.',
        ],
      },
    ],
  },
  prieres: {
    title: 'Catholic Prayers',
    subtitle: 'Heart-to-heart dialogue with God',
    blocks: [
      {
        heading: 'Fundamental prayers',
        paragraphs: [
          'Our Father: the prayer Jesus taught us.',
          'Hail Mary: Marian prayer of intercession.',
          'Glory Be: praise to the Trinity.',
          'Apostles\' Creed: profession of apostolic faith.',
          'Act of Contrition: request for forgiveness.',
        ],
      },
      {
        heading: 'Forms of prayer',
        paragraphs: [
          'The Church offers vocal prayer, meditation and contemplation. The Rosary, Eucharistic adoration, spiritual reading and participation in Mass are privileged means of growing in relationship with God.',
        ],
      },
    ],
  },
  catechisme: {
    title: 'The Catechism',
    subtitle: 'Faithful exposition of the Church\'s faith',
    blocks: [
      {
        paragraphs: [
          'The Catechism of the Catholic Church presents organically and synthetically the essential contents of Christian faith and morality.',
          'It is structured in four parts: the profession of faith (Creed), the celebration of the Christian mystery (liturgy), life in Christ (morality) and Christian prayer.',
        ],
      },
    ],
  },
  documents: {
    title: 'Important Church Documents',
    subtitle: 'Magisterium and official teaching',
    blocks: [
      {
        paragraphs: [
          'The Bible: written Word of God, inspired by the Holy Spirit.',
          'The Catechism of the Catholic Church (1992).',
          'Documents of the Second Vatican Council (1962-1965).',
          'Papal encyclicals, including Laudato si\' and Fratelli tutti.',
          'The Code of Canon Law and directives of episcopal conferences.',
        ],
      },
    ],
  },
  bible: {
    title: 'The Bible',
    subtitle: 'The Word of God for the salvation of humanity',
    blocks: [
      {
        paragraphs: [
          'The Bible brings together the Old and New Testaments. It tells the history of salvation: creation, the election of Israel, the coming of the Messiah Jesus Christ, the founding of the Church and the expectation of the fullness of the Kingdom.',
          'The Catholic Church venerates the Bible as the Word of God and interprets it within the living Tradition, under the guidance of the Magisterium.',
        ],
      },
    ],
  },
  conciles: {
    title: 'The Councils',
    subtitle: 'Solemn assemblies of the universal Church',
    blocks: [
      {
        paragraphs: [
          'Ecumenical councils gather bishops from around the world under the authority of the Pope to defend and transmit the faith, and to resolve doctrinal and disciplinary questions.',
          'Among the most important: Nicaea (325), Trent (1545-1563), Vatican I (1869-1870) and Vatican II (1962-1965), which opened the Church to mission in the modern world.',
        ],
      },
    ],
  },
  papes: {
    title: 'The Popes',
    subtitle: 'Successors of Peter in the service of unity',
    blocks: [
      {
        paragraphs: [
          'The Pope, Bishop of Rome, is the successor of Peter and shepherd of the universal Church. He exercises a ministry of primacy and vigilance for the communion of all the faithful.',
          'Francis, the current Pope, calls the Church to mercy, going out to the peripheries and universal fraternity.',
        ],
      },
    ],
  },
  vocations: {
    title: 'Vocations',
    subtitle: 'God\'s call to each person',
    blocks: [
      {
        paragraphs: [
          'Every baptised person receives a vocation: a call to holiness in the world or in consecrated life. Some are called to the ministerial priesthood or religious life.',
          'The parish accompanies vocational discernment through prayer, formation and the example of priests and religious.',
        ],
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions about the Catholic Faith',
    subtitle: 'Clear answers to common questions',
    blocks: [
      {
        heading: 'Why go to Mass on Sunday?',
        paragraphs: [
          'Sunday, the day of the Resurrection, Christians gather to celebrate the Eucharist, renew their covenant with God and strengthen the community. It is a precept of the Church and a spiritual necessity.',
        ],
      },
      {
        heading: 'Why go to confession?',
        paragraphs: [
          'The sacrament of reconciliation restores communion with God and the Church after sin. It is an act of mercy and spiritual healing.',
        ],
      },
      {
        heading: 'How to become Catholic?',
        paragraphs: [
          'The catechumenate journey, usually one year, accompanies adults towards baptism, confirmation and first communion. Contact your parish to learn more.',
        ],
      },
    ],
  },
}
