// ============================================================
// SILENCER: THE ARSIA MONS ARCHIVE — LORE DATA
// Design: Dark Faction Terminal (Approach C)
// Canon material drawn from game wiki + agency bio screens.
// Expanded lore marked as EXPANDED. All else is CANON.
// ============================================================

export type Classification = 'CANON' | 'EXPANDED' | 'CLASSIFIED' | 'REDACTED' | 'RUMOR';
export type FactionId = 'noxis' | 'static' | 'caliber' | 'lazarus' | 'blackrose' | 'gov' | 'independent';

export interface LoreTag {
  label: string;
  color?: string;
}

export interface Agency {
  id: FactionId;
  name: string;
  codename: string;
  color: string;
  colorDim: string;
  tagline: string;
  classification: Classification;
  // Canon bio from game
  canonBio: string;
  // Expanded lore
  expandedBio: string;
  advantages: string[];
  specialAbility: string;
  // Expanded lore fields
  founded: string;
  foundedNote: string;
  structure: string;
  doctrine: string;
  knownOperatives: Agent[];
  myths: string[];
  relationships: { agency: FactionId; status: 'allied' | 'hostile' | 'unknown' | 'complicated'; note: string }[];
  secretHistory: string;
  propaganda: string;
  urbanLegends: string[];
  equipment: Equipment[];
}

export interface Agent {
  codename: string;
  agency: FactionId;
  status: 'active' | 'deceased' | 'missing' | 'unknown' | 'turned';
  classification: Classification;
  bio: string;
  lastKnownLocation?: string;
  notableActions?: string;
}

export interface Equipment {
  name: string;
  type: 'weapon' | 'tool' | 'enhancement' | 'compound';
  classification: Classification;
  description: string;
  agencyExclusive?: FactionId;
}

export interface TimelineEntry {
  id: string;
  year: string;
  era: string;
  title: string;
  classification: Classification;
  summary: string;
  detail: string;
  factions: FactionId[];
  tags: string[];
}

export interface District {
  id: string;
  name: string;
  sector: string;
  classification: Classification;
  controlledBy: FactionId | 'contested' | 'gov';
  description: string;
  expandedDescription: string;
  knownLocations: string[];
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  rumors: string[];
}

export interface ClassifiedFile {
  id: string;
  title: string;
  classification: Classification;
  date: string;
  author: string;
  content: string;
  relatedFactions: FactionId[];
  tags: string[];
  isLocked: boolean;
}

export interface Conspiracy {
  id: string;
  title: string;
  classification: Classification;
  status: 'unverified' | 'partially_confirmed' | 'confirmed' | 'debunked';
  summary: string;
  evidence: string[];
  factions: FactionId[];
  analystNote: string;
}

// ============================================================
// AGENCIES
// ============================================================

export const agencies: Agency[] = [
  {
    id: 'noxis',
    name: 'Noxis',
    codename: 'BREATHKEEPER',
    color: '#3b82f6',
    colorDim: '#1d4ed8',
    tagline: 'They built the air you breathe. They can take it back.',
    classification: 'CANON',
    canonBio: 'The Noxis corporation terraformed the majority of the initial habitable sectors of Mars, and continues to do so, as well as producing and selling 70 percent of the breathable oxygen. Since they are widely known to the populace and government, they have taken steps to bolster their agent\'s health so they are better able to avoid detection. Training in bio-sporria rich environments, and possessing suits with advanced oxygen processors and filters, has given these agents improved physical abilities such as higher jumps, more stamina, and enhanced durability.',
    expandedBio: `Noxis did not begin as an intelligence agency. It began as a terraforming contract. When the Martian Colonial Authority awarded the original atmospheric seeding rights to Noxis Atmospheric Solutions in the colony's third decade, no one anticipated that controlling oxygen production would become the most powerful political lever on Mars.

By the time the Arsia Mons colony reached a population of two hundred thousand, Noxis controlled 70 percent of breathable oxygen output. The remaining 30 percent was distributed between government-run stations and two smaller competitors — both of which were quietly acquired within a decade through a combination of debt leverage and what internal documents called "competitive pressure events," a phrase that investigators later connected to at least three industrial accidents.

The Noxis intelligence division — internally designated BREATHKEEPER — was not formed to fight the government. It was formed to protect the corporation's secrets from the government. The distinction matters. Noxis agents are not ideologues. They are asset protection specialists who happen to operate in a warzone.

Their training regimen is the most physically demanding of any agency. Recruits spend eighteen months in the bio-sporria cultivation chambers beneath Sector 7, breathing air with oxygen concentrations that would incapacitate an unaugmented human. The survivors emerge with lung capacity 40 percent above baseline, cardiovascular systems rebuilt around the corporation's proprietary oxygen-processing implants, and a loyalty to Noxis that borders on biological dependency — because it is.`,
    advantages: ['Endurance +3', 'Jump +5'],
    specialAbility: 'Enhanced oxygen processing — superior stamina and jump height in all environments',
    founded: 'Colony Year 31 (approximately 2041 CE)',
    foundedNote: 'EXPANDED — exact founding date classified by Noxis corporate charter',
    structure: 'Corporate hierarchy. Field agents report to Regional Asset Coordinators, who report to the Board of Atmospheric Directors. The intelligence division is officially listed as "Environmental Compliance" in corporate filings.',
    doctrine: 'Protect the asset. The asset is oxygen. Everything else is negotiable.',
    knownOperatives: [
      {
        codename: 'LUNGFISH',
        agency: 'noxis',
        status: 'active',
        classification: 'EXPANDED',
        bio: 'Senior field operative. Reportedly survived three confirmed assassination attempts by Black Rose. Known for operating in sectors with compromised atmospheric integrity — areas where unaugmented agents cannot function. Considered the most dangerous Noxis operative currently in the field.',
        lastKnownLocation: 'Sector 7, Arsia Mons Lower Habitation Ring',
        notableActions: 'Recovered the Cypher Lock 3 documents from the Caliber breach of Colony Year 89. Allegedly responsible for the "oxygen incident" in the Static safehouse at Grid 44-North.'
      },
      {
        codename: 'PALE BREATH',
        agency: 'noxis',
        status: 'missing',
        classification: 'CLASSIFIED',
        bio: 'Former lead researcher on the Sporria-7 enhancement program. Disappeared six months after filing an internal complaint about the program\'s human trial protocols. Noxis officially lists her as "transferred to deep terraforming operations." No one has seen her since.',
        lastKnownLocation: 'Unknown. Last confirmed sighting: Caliber-controlled district, Grid 22.',
        notableActions: 'Authored the classified document "BREATHKEEPER PROTOCOL: PHASE THREE" — contents unknown outside Noxis Board level.'
      }
    ],
    myths: [
      'Noxis can remotely reduce oxygen output to any sector within 90 seconds. They have never confirmed or denied this capability.',
      'The original terraforming contract contained a clause granting Noxis the right to "atmospheric reclamation" in the event of colony dissolution. No one knows what that means.',
      'There is a thirteenth oxygen production facility that does not appear on any official map. Operatives who have searched for it report finding only sealed tunnels and dead ends.'
    ],
    relationships: [
      { agency: 'gov', status: 'complicated', note: 'Noxis is the government\'s most powerful contractor and most dangerous liability. Each needs the other. Neither trusts the other.' },
      { agency: 'static', status: 'hostile', note: 'Static has repeatedly attempted to hack Noxis atmospheric control systems. Noxis considers Static an existential threat.' },
      { agency: 'caliber', status: 'allied', note: 'Noxis purchases intelligence from Caliber regularly. The relationship is transactional and cold.' },
      { agency: 'lazarus', status: 'unknown', note: 'Lazarus has never directly targeted Noxis infrastructure. The reason is unclear and deeply unsettling to Noxis analysts.' },
      { agency: 'blackrose', status: 'hostile', note: 'Black Rose has eliminated four Noxis board members in the past decade. Noxis has placed standing termination contracts on all known Black Rose operatives.' }
    ],
    secretHistory: `In Colony Year 67, a Noxis internal audit discovered that the atmospheric processors in Sectors 12 through 19 had been quietly modified to include a secondary output valve — one that could, in theory, vent breathable air directly into the Martian exterior rather than into the habitation ring. The modification was traced to a contractor team that had worked on the original installation. The contractor team no longer existed as a legal entity. Three of its former members were found dead within the following year. The audit report was classified at Board level. The valves were never removed. When a junior analyst asked why, she was transferred to deep terraforming operations.`,
    propaganda: `NOXIS ATMOSPHERIC SOLUTIONS — BECAUSE MARS BREATHES FOR YOU.
"We built this world from nothing. We gave you air when there was none. We will continue to give you air as long as you deserve it."
— Official Noxis colony broadcast, Colony Year 88`,
    urbanLegends: [
      'Noxis agents can hold their breath for twelve minutes due to their augmentations. In a sector with compromised air, they are effectively invisible.',
      'The Noxis Board has a contingency plan called LAST BREATH that would allow them to survive the complete atmospheric collapse of the colony for up to 72 hours in a sealed facility. Everyone else would die.',
      'Bio-sporria, the organism used in Noxis training, is sentient. Not intelligent — but aware. Noxis researchers know this and have suppressed the findings.'
    ],
    equipment: [
      {
        name: 'Sporria-7 Lung Augmentation',
        type: 'enhancement',
        classification: 'CLASSIFIED',
        description: 'Proprietary biological enhancement using cultivated bio-sporria organisms integrated into the pulmonary system. Increases oxygen efficiency by 40%, grants resistance to atmospheric toxins, and provides the characteristic enhanced endurance and jump capacity of Noxis field agents. Side effects include dependency on Noxis-branded oxygen supplements and, in some cases, altered skin pigmentation.',
        agencyExclusive: 'noxis'
      },
      {
        name: 'Atmospheric Processor Suit',
        type: 'tool',
        classification: 'CANON',
        description: 'Advanced environmental suit with integrated oxygen filtration and recycling. Allows operation in compromised atmospheric zones. The suit\'s oxygen supply is sealed and independent, making the wearer immune to atmospheric attacks.',
        agencyExclusive: 'noxis'
      }
    ]
  },
  {
    id: 'static',
    name: 'Static',
    codename: 'BRAINDRAIN',
    color: '#06b6d4',
    colorDim: '#0891b2',
    tagline: 'The government built us to control the network. We had other ideas.',
    classification: 'CANON',
    canonBio: 'The Guv first realized that there was a brain-drain about four years ago. Silently, the youngest talented computer specialists and high level programmers were disappearing and leaving the Guv without the technical support it required. They ended up creating Static as a technologically savvy anti-government agency, but many members are more interested in reinforcing their reputation as turbulently wild hackers with the best skills and techniques.',
    expandedBio: `The government's mistake was not losing its programmers. The mistake was trying to get them back.

When the Martian Colonial Authority noticed the systematic disappearance of its technical workforce — the coders, the network architects, the satellite engineers — it did not ask why they were leaving. It asked how to replace them. The solution was Static: a nominally government-affiliated agency that would recruit from the same underground technical culture that had been absorbing the missing workers.

The plan failed immediately. The recruits joined. They took the training, the equipment, the satellite access codes. And then they used all of it against the institution that had given it to them.

Static is not a coherent organization. It is a reputation. A brand that the most technically gifted anti-government operatives on Mars have adopted as their own. There is no central leadership, no formal hierarchy, no membership registry. There is only the network — a distributed mesh of encrypted communication nodes that Static operatives maintain, protect, and use to coordinate operations that range from data theft to infrastructure sabotage to the publication of government secrets.

What unifies Static is not ideology but culture. Static operatives are competitive, territorial, and obsessed with technical superiority. They will work together when the target is interesting enough. They will betray each other when the reputation gain is sufficient. The government created a monster and then lost the leash.`,
    advantages: ['Satellite Ability', 'Hacking +3'],
    specialAbility: 'Satellite uplink — can reveal enemy positions and access remote terminals',
    founded: 'Colony Year 85 (approximately 4 years before game events)',
    foundedNote: 'CANON — the game bio specifies "four years ago"',
    structure: 'Decentralized mesh network. No formal hierarchy. Reputation-based influence system — the most skilled operatives command the most resources and respect. Coordination happens through encrypted channels on the "Dead Signal" network.',
    doctrine: 'The network is the weapon. Information is the ammunition. Reputation is the only currency that matters.',
    knownOperatives: [
      {
        codename: 'GHOST PACKET',
        agency: 'static',
        status: 'active',
        classification: 'EXPANDED',
        bio: 'The closest thing Static has to a legend. Reportedly responsible for the first successful breach of the Noxis atmospheric control mainframe — a hack that lasted 11 seconds before being detected, but long enough to extract the facility layout for Grid 7-South. Identity unknown. Communicates only through the Dead Signal network. Some analysts believe Ghost Packet is not a single person but a rotating identity passed between Static\'s most trusted operatives.',
        lastKnownLocation: 'Unknown. Signal traces suggest mobile operation across multiple sectors.',
        notableActions: 'The Noxis mainframe breach. The Government Census Leak of Colony Year 87. The "Satellite Blind" event that disabled three government surveillance arrays for 14 hours.'
      },
      {
        codename: 'FREQUENCY',
        agency: 'static',
        status: 'deceased',
        classification: 'EXPANDED',
        bio: 'One of the original government programmers who disappeared during the brain-drain. Became Static\'s most prolific satellite hacker before being killed in a Caliber-brokered assassination. The circumstances of the contract are classified. Static has never forgiven Caliber.',
        lastKnownLocation: 'Sector 3, Grid 18. Body recovered.',
        notableActions: 'Designed the original Dead Signal network architecture. Wrote the "Cypher Lock Protocol" that Static operatives still use to secure their bases.'
      }
    ],
    myths: [
      'Static has a backdoor into every government terminal on Mars. They have had it for three years and have been watching without acting, waiting for the right moment.',
      'The original brain-drain was not spontaneous. Someone organized it — recruited the programmers, gave them a destination, built the infrastructure for Static before the government even noticed the workers were gone. No one knows who.',
      'There is a Static operative embedded in the Noxis Board of Directors. They have been there for two years. They are waiting for a signal.'
    ],
    relationships: [
      { agency: 'gov', status: 'hostile', note: 'Static was created by the government and immediately turned against it. The government considers Static its most dangerous internal threat.' },
      { agency: 'noxis', status: 'hostile', note: 'Static views Noxis as the physical embodiment of corporate tyranny. Noxis views Static as a terrorist organization.' },
      { agency: 'caliber', status: 'hostile', note: 'Caliber sold information that led to the death of FREQUENCY. Static has not forgotten.' },
      { agency: 'lazarus', status: 'unknown', note: 'Lazarus operatives have been observed using Static-developed hacking tools. The connection is unexplained.' },
      { agency: 'blackrose', status: 'complicated', note: 'Static and Black Rose have never directly conflicted. Some analysts believe they have a non-aggression arrangement, though neither would confirm this.' }
    ],
    secretHistory: `The brain-drain was not an accident. Recovered communications from Colony Year 83 — two years before the government noticed the problem — show a coordinated recruitment effort targeting government technical staff. The recruiter used the codename ARCHITECT and promised "a network where your work matters." ARCHITECT was never identified. The government's investigation was closed without conclusion. Static operatives who know the story treat ARCHITECT as a founding myth — a ghost who built their world and then disappeared into it.`,
    propaganda: `STATIC BROADCAST — DEAD SIGNAL NETWORK — COLONY YEAR 89
"The government built this network to watch you. We rebuilt it to watch them back. Every terminal you hack is a window. Every secret you steal is a weapon. The colony belongs to the people who understand it. Start understanding."`,
    urbanLegends: [
      'Static can hear every conversation that passes through a government terminal. They have recordings of everything the Colonial Authority has said for the past three years.',
      'The "Satellite Blind" event was a test. Static wanted to see how long it would take the government to notice. The answer — 14 hours — was longer than anyone expected.',
      'Ghost Packet is actually a former government intelligence director who faked their own death and built Static from the inside. The brain-drain was their exit strategy.'
    ],
    equipment: [
      {
        name: 'Dead Signal Uplink Module',
        type: 'tool',
        classification: 'CLASSIFIED',
        description: 'A miniaturized satellite communication device that connects to the Static-maintained Dead Signal network. Allows real-time intelligence sharing, remote terminal access, and position tracking of tagged targets. The government has been trying to locate and destroy the network\'s relay nodes for three years without success.',
        agencyExclusive: 'static'
      },
      {
        name: 'Cypher Lock Breaker',
        type: 'tool',
        classification: 'CANON',
        description: 'Static\'s signature hacking tool. Capable of defeating the three-layer Cypher Lock security system used on government terminals. The tool works by exploiting a timing vulnerability in the Guv Net OS that Static discovered and has never disclosed to the government.',
        agencyExclusive: 'static'
      }
    ]
  },
  {
    id: 'caliber',
    name: 'Caliber',
    codename: 'FACTFINDER',
    color: '#d97706',
    colorDim: '#b45309',
    tagline: 'Information is the only currency that never devalues.',
    classification: 'CANON',
    canonBio: 'Looking more like weekend fact-finders or trivia buffs than technological spelunkers, members of Caliber seem to be concerned with obtaining a broad range of general information. So while harvesting data may be only a hobby for their predominantly upper-class agents, even the simplest router checks give them what they want. For some reason, Caliber pays its members extremely well for even the most common files.',
    expandedBio: `Caliber is the oldest agency on Mars. It predates the government it now operates against. It predates the colony's political crisis. It may predate the colony itself.

The organization that would become Caliber began as a private intelligence collective formed by the original Martian colonial investors — the Earth-based financial interests who funded the first wave of terraforming and expected a return. When the colonial government declared independence from Earth financial oversight in Colony Year 44, those investors did not withdraw. They adapted. Their information network became Caliber.

The agency's upper-class composition is not accidental. Caliber recruits from the colony's administrative and commercial elite — people who have legitimate access to government facilities, corporate boardrooms, and social events where information flows freely. A Caliber operative attending a Noxis Board reception is not suspicious. They are expected. The information they collect over dinner is worth more than anything a Static hacker could extract from a terminal.

Caliber's payment structure is its most distinctive feature. The agency pays extraordinarily well for even routine intelligence — a policy that has never been adequately explained. The prevailing theory among analysts is that Caliber is not collecting information for its own use. It is collecting information on behalf of a client. The identity of that client — if one exists — is the most closely guarded secret in the colony.`,
    advantages: ['Contacts +3'],
    specialAbility: 'Extensive contact network — superior access to intelligence and black market resources',
    founded: 'Colony Year 44 or earlier',
    foundedNote: 'EXPANDED — Caliber\'s founding predates available records. The agency has never disclosed its origin.',
    structure: 'Appears flat and informal — agents operate independently, report to "coordinators" who are themselves agents. The actual decision-making structure is unknown. Caliber may have a hidden leadership layer that no outsider has ever identified.',
    doctrine: 'Collect everything. Sell selectively. Never reveal the client.',
    knownOperatives: [
      {
        codename: 'LEDGER',
        agency: 'caliber',
        status: 'active',
        classification: 'EXPANDED',
        bio: 'Caliber\'s most prolific information broker. Reportedly has contacts in every agency, including Black Rose — a claim that most analysts consider impossible. LEDGER has never been identified despite being active for at least twelve years. The working theory is that LEDGER is not a single operative but a role that has been passed between multiple agents.',
        lastKnownLocation: 'Believed to operate primarily in the upper habitation sectors — the colony\'s commercial district.',
        notableActions: 'Brokered the sale of Static intelligence to Noxis that led to the Grid 44-North incident. Sold government troop movement data to three different agencies simultaneously during the Sector 9 crisis.'
      },
      {
        codename: 'SOCIAL CALL',
        agency: 'caliber',
        status: 'turned',
        classification: 'CLASSIFIED',
        bio: 'Former Caliber operative who was reportedly recruited by the government after being captured. Now believed to be feeding false intelligence back to Caliber on the government\'s behalf. Caliber may be aware of this and is using SOCIAL CALL to feed disinformation to the government. The situation has become recursive and neither side is certain what is real.',
        lastKnownLocation: 'Government administrative sector.',
        notableActions: 'The Sector 9 intelligence disaster. Whether this was genuine failure or deliberate manipulation is unknown.'
      }
    ],
    myths: [
      'Caliber knows the identity of every operative in every agency. They have never used this information as leverage — which means they are saving it for something.',
      'The "client" that Caliber collects information for is not on Mars. It is an Earth-based interest that has been monitoring the colony\'s political situation for decades, waiting for the right moment to intervene.',
      'Caliber has a file on the government\'s cleansing protocol — the contingency plan for eliminating all agency operatives simultaneously. They have had it for years and have never sold it.'
    ],
    relationships: [
      { agency: 'gov', status: 'complicated', note: 'Caliber sells information to the government and against the government simultaneously. The government tolerates this because Caliber\'s intelligence is too valuable to lose.' },
      { agency: 'noxis', status: 'allied', note: 'Caliber\'s most reliable client. Noxis pays premium rates for intelligence on Static and Black Rose.' },
      { agency: 'static', status: 'hostile', note: 'Static has never forgiven Caliber for the FREQUENCY assassination contract.' },
      { agency: 'lazarus', status: 'unknown', note: 'Caliber has no reliable intelligence on Lazarus. This is the only gap in their information network and it disturbs them deeply.' },
      { agency: 'blackrose', status: 'complicated', note: 'Caliber and Black Rose have a mutual non-interference arrangement. Neither agency has explained why.' }
    ],
    secretHistory: `In Colony Year 71, a Caliber coordinator named ARCHIVIST attempted to compile a complete record of Caliber's true founding and client structure. The investigation lasted three months. At the end of it, ARCHIVIST submitted a single-page report that read: "The question cannot be answered safely. I recommend ceasing inquiry." ARCHIVIST retired from field work immediately afterward and has never spoken about the investigation. The report is classified at a level that most Caliber operatives did not know existed.`,
    propaganda: `CALIBER INTERNAL BULLETIN — DISTRIBUTION: FIELD OPERATIVES
"You are not here to fight. You are here to know. The operative who knows more than their opponent has already won. Every file you retrieve, every contact you cultivate, every conversation you overhear — this is your weapon. Use it precisely."`,
    urbanLegends: [
      'Caliber has a complete record of every secret stolen from every government terminal in the colony\'s history. They have never published it because they are still adding to it.',
      'The reason Caliber pays so well for common files is that they are building a complete picture of something — something that requires thousands of small pieces of information to see. No one knows what the picture shows.',
      'There is a Caliber operative in the Lazarus inner circle. They have been there for years. They have never reported back.'
    ],
    equipment: [
      {
        name: 'Social Engineering Kit',
        type: 'tool',
        classification: 'EXPANDED',
        description: 'A collection of forged credentials, social access passes, and communication intercept devices disguised as ordinary personal items. Allows Caliber operatives to access restricted areas through social means rather than technical intrusion. The kit is updated regularly to match current government credential formats.',
        agencyExclusive: 'caliber'
      },
      {
        name: 'Contact Ledger (Encrypted)',
        type: 'tool',
        classification: 'CLASSIFIED',
        description: 'A quantum-encrypted personal device containing Caliber\'s contact network — names, locations, leverage points, and payment histories. If captured, the device self-destructs and transmits an alert to all listed contacts. The encryption has never been broken.',
        agencyExclusive: 'caliber'
      }
    ]
  },
  {
    id: 'lazarus',
    name: 'Lazarus',
    codename: 'PHOENIX CYCLE',
    color: '#7c3aed',
    colorDim: '#6d28d9',
    tagline: 'They have died before. They will die again. They always come back.',
    classification: 'CANON',
    canonBio: 'Like the mythical phoenix, the loose organization known as Lazarus has been resurfacing every hundred years and causing chaos in the larger urban areas of Mars. Whether it\'s belief in some higher power, an understanding of mystical truths, or something else entirely, no one outside of the group is sure of their motives. Numerous witnesses of Lazarus attacks claim to have seen supposedly fatally wounded agents dust themselves off and continue their efforts, virtually undamaged.',
    expandedBio: `The oldest question about Lazarus is not how they survive. It is how they existed before the colony.

The game bio states that Lazarus has been resurfacing "every hundred years." The Arsia Mons colony is, at the time of the game's events, approximately ninety years old. If the pattern holds, Lazarus predates the colony by at least a century — which means they were operating on Mars before Mars was habitable.

This is the detail that no analyst has been able to explain. The official government position is that the "hundred year" claim is mythology — that Lazarus is a recent organization that has adopted an ancient name for psychological effect. The unofficial position, held by the intelligence analysts who have studied Lazarus most closely, is that the official position is wrong.

What is documented: Lazarus operatives demonstrate a capacity for physical recovery that exceeds any known medical or augmentation technology. Witnesses describe agents absorbing what should be fatal wounds and continuing to function. Government autopsies of confirmed Lazarus casualties have found biological structures that do not correspond to any known human anatomy — structures that appear to be in the process of repair at the time of death.

What is theorized: Lazarus has access to a resurrection technology — not metaphorical, not psychological, but literal. The nature of that technology, its origin, and the cost of using it are unknown. What is known is that Lazarus operatives do not fear death in the way that other agents do. This makes them the most dangerous operatives in the field.`,
    advantages: ['Resurrection Ability'],
    specialAbility: 'Resurrection — agents can recover from fatal wounds and continue operating',
    founded: 'Unknown. Claims of operation predate the colony.',
    foundedNote: 'EXPANDED — the hundred-year cycle claim from the game bio implies a founding that predates Mars colonization. This has never been explained.',
    structure: 'Unknown. Lazarus operatives appear to operate in small cells with no visible coordination, yet their actions suggest strategic coherence. The existence of a central leadership is unconfirmed.',
    doctrine: 'The cycle continues. Death is a transition, not an end. Return. Complete the work.',
    knownOperatives: [
      {
        codename: 'THE RETURNED',
        agency: 'lazarus',
        status: 'unknown',
        classification: 'CLASSIFIED',
        bio: 'A Lazarus operative who has been confirmed dead on three separate occasions — twice by government forces, once by Black Rose. Each time, the operative reappeared within weeks, apparently unharmed. Government intelligence has no explanation. The operative\'s true identity is unknown. Some analysts believe "The Returned" is a title passed between different operatives rather than a single individual.',
        lastKnownLocation: 'Last confirmed sighting: Sector 11, Colony Year 88.',
        notableActions: 'The Sector 4 uprising of Colony Year 85. The destruction of the government\'s Lazarus research facility in Colony Year 87. The assassination of three government intelligence directors over a period of twelve years.'
      },
      {
        codename: 'FIRST CYCLE',
        agency: 'lazarus',
        status: 'unknown',
        classification: 'REDACTED',
        bio: '[RECORD SEALED — COLONIAL AUTHORITY DIRECTIVE 7-ALPHA] [ANALYST NOTE: This record was sealed by government order following the Sector 11 incident. The subject\'s identity and the nature of the sealing directive are unknown. The existence of this record was itself classified until a Static breach in Colony Year 88.]',
        lastKnownLocation: '[REDACTED]',
        notableActions: '[REDACTED]'
      }
    ],
    myths: [
      'Lazarus was operating on Mars before the first human arrived. They were waiting.',
      'The resurrection ability is not technology. It is biological. Lazarus operatives have been modified at a genetic level to survive what should kill them. The modification was made before the colony existed.',
      'Every hundred years, Lazarus "resets" — all current operatives die simultaneously, and a new generation emerges. The current cycle is approaching its end.'
    ],
    relationships: [
      { agency: 'gov', status: 'hostile', note: 'The government has been trying to eliminate Lazarus for decades. They have never succeeded. The government\'s Lazarus research program was destroyed in Colony Year 87.' },
      { agency: 'noxis', status: 'unknown', note: 'Lazarus has never targeted Noxis infrastructure. Noxis finds this more disturbing than hostility would be.' },
      { agency: 'static', status: 'unknown', note: 'Static operatives have been observed using Lazarus-adjacent communication protocols. The connection is unexplained.' },
      { agency: 'caliber', status: 'unknown', note: 'Caliber has no reliable intelligence on Lazarus. This is the only gap in their network.' },
      { agency: 'blackrose', status: 'hostile', note: 'Black Rose and Lazarus have a history of direct conflict that predates all other agency rivalries. The origin of their enmity is unknown.' }
    ],
    secretHistory: `In Colony Year 44 — the same year the colonial government declared independence from Earth financial oversight — a government survey team exploring the deep tunnels beneath Arsia Mons found a sealed chamber. The chamber contained equipment of unknown manufacture and purpose. The survey team's report was classified immediately. Three members of the team died within the following year under circumstances described as "unrelated accidents." The chamber was sealed with government-grade explosive charges. The survey team's lead scientist disappeared six months later and was never found. A Lazarus operative was seen in the area two days before the disappearance.`,
    propaganda: `LAZARUS TRANSMISSION — ENCRYPTED — CYCLE MARKER 89
"You have seen us fall. You have counted our dead. You have sealed our chambers and burned our records. We have been here before you. We will be here after you. The cycle does not end because you wish it to. Return. Complete the work."`,
    urbanLegends: [
      'The sealed chamber beneath Arsia Mons is still there. The explosive charges did not destroy it — they only sealed it more thoroughly. Lazarus knows how to open it.',
      'Lazarus operatives do not age. The operative known as The Returned has been active for at least forty years. They appear to be in their thirties.',
      'The hundred-year cycle is not a metaphor for organizational renewal. It is a literal biological cycle. Every hundred years, something happens to Lazarus operatives — something that the government has been trying to understand and replicate for decades.'
    ],
    equipment: [
      {
        name: 'Cycle Restoration Protocol',
        type: 'enhancement',
        classification: 'CLASSIFIED',
        description: 'The biological or technological mechanism behind Lazarus\'s resurrection ability. The exact nature is unknown to all outside analysts. Government research programs have attempted to replicate it without success. What is known: it is not a standard medical augmentation, it appears to be organic in nature, and it has a cost that Lazarus operatives do not discuss.',
        agencyExclusive: 'lazarus'
      }
    ]
  },
  {
    id: 'blackrose',
    name: 'Black Rose',
    codename: 'THORNFIELD',
    color: '#dc2626',
    colorDim: '#b91c1c',
    tagline: 'Something was taken from them. What replaced it is worse.',
    classification: 'CANON',
    canonBio: 'More like a dark force than a loose collection of humans, little is known of Black Rose. Something vibrant was taken from these people, and left in its place was a new form of sustenance. Its members seem to be misanthropic and have a penchant for using illegal compounds such as Hollowhead injections to cause extreme pain and internal withering in their victims. Shunned by even the most avaristic mercenaries, these agents work alone and yet still prosper due to some combination of ego and superlative talent.',
    expandedBio: `The game bio for Black Rose contains a phrase that no analyst has been able to explain: "Something vibrant was taken from these people." Not trained out of them. Not suppressed. Taken.

Black Rose operatives are not sociopaths by nature. The psychological profiles that government intelligence has assembled — at great cost, given how few Black Rose operatives have ever been captured alive — suggest people who were, at some point, ordinary. People who had connections, ambitions, preferences, the ordinary texture of a human life. And then did not.

The working theory is that Black Rose recruits through a process of deliberate psychological destruction. Candidates are identified — not for their skills, but for their potential — and then subjected to a conditioning process that removes everything that would make them hesitate. The result is not a soldier or an assassin in the conventional sense. It is something more efficient and more disturbing: a person who is genuinely indifferent to human suffering, including their own.

The Hollowhead compound is Black Rose's signature. It is not a weapon in the conventional sense — it does not kill quickly. It causes a progressive internal dissolution that takes days, during which the victim remains conscious and functional but in increasing agony. Black Rose operatives use it not because it is the most effective method of elimination but because it is the most memorable. They are not trying to kill. They are trying to send a message. The message is: we are not like the others. Do not mistake us for the others.`,
    advantages: ['Stealth Ability', 'Shield +2'],
    specialAbility: 'Stealth mode — can pass as civilian NPC, immune to automated defenses',
    founded: 'Unknown. Possibly predates all other agencies.',
    foundedNote: 'EXPANDED — no founding record exists. Black Rose\'s origin is the most closely guarded secret in the colony.',
    structure: 'Absolute isolation. Every operative works alone. There is no known coordination mechanism, yet Black Rose operatives never interfere with each other\'s operations. How they avoid conflict without communication is unknown.',
    doctrine: 'Work alone. Leave no witnesses. The mission is everything. The self is nothing.',
    knownOperatives: [
      {
        codename: 'THORN',
        agency: 'blackrose',
        status: 'active',
        classification: 'CLASSIFIED',
        bio: 'The most documented Black Rose operative in the colony\'s history — which means three confirmed sightings and one recovered physical trace (a Hollowhead injector casing). Responsible for the elimination of four Noxis board members and two government intelligence directors. Has never been captured. Has never been photographed. Government intelligence believes THORN has been active for at least fifteen years, which would make them one of the longest-serving operatives in any agency.',
        lastKnownLocation: 'Unknown. Sightings reported in multiple sectors simultaneously, suggesting either multiple operatives using the codename or deliberate disinformation.',
        notableActions: 'The Noxis Board eliminations. The government intelligence director assassinations. The "Hollowhead Incident" at the Caliber safehouse in Sector 7.'
      }
    ],
    myths: [
      'Black Rose operatives cannot feel pain. The conditioning process that removes their emotional responses also removes their pain response. This is why they can sustain injuries that would incapacitate other agents.',
      'There is a Black Rose "retirement" protocol. Operatives who have completed a certain number of missions are eliminated by the agency itself. No one knows why.',
      'The Hollowhead compound was not developed by Black Rose. It was stolen from a government research program that was attempting to develop a non-lethal interrogation tool. The program was shut down when the compound proved impossible to control.'
    ],
    relationships: [
      { agency: 'gov', status: 'hostile', note: 'Black Rose has eliminated more government officials than any other agency. The government\'s standing order is to eliminate Black Rose operatives on sight.' },
      { agency: 'noxis', status: 'hostile', note: 'Black Rose has placed four Noxis board members on the Hollowhead list. Noxis has placed standing termination contracts on all known Black Rose operatives.' },
      { agency: 'static', status: 'complicated', note: 'No direct conflict. Possible non-aggression arrangement. Neither agency has confirmed this.' },
      { agency: 'caliber', status: 'complicated', note: 'Mutual non-interference arrangement. Neither agency has explained why.' },
      { agency: 'lazarus', status: 'hostile', note: 'The oldest rivalry in the colony. The origin of the conflict predates available records.' }
    ],
    secretHistory: `The government's classified research program on Black Rose — designated PROJECT THORNFIELD — ran for eleven years before being shut down in Colony Year 82. The program's final report, recovered by Static in the Colony Year 88 breach, contained a single conclusion: "Black Rose operatives are not augmented. They are not conditioned in any conventional sense. The psychological profiles suggest a process of identity replacement rather than modification. We do not know what replaces the original identity. We do not know where the original identity goes. We recommend immediate termination of this research program and destruction of all records." The program was shut down two weeks later. The lead researcher disappeared the same day.`,
    propaganda: `[NO KNOWN BLACK ROSE PROPAGANDA EXISTS]
[ANALYST NOTE: Black Rose does not communicate publicly. They do not recruit publicly. They do not claim credit for operations publicly. The only communication they make is the Hollowhead itself — left in the victim, still active, as a message to whoever finds the body.]`,
    urbanLegends: [
      'Black Rose operatives can see in complete darkness. Not through augmentation — through something else. Witnesses who have survived Black Rose encounters describe operatives moving with perfect confidence in environments with zero light.',
      'The "something vibrant" that was taken from Black Rose operatives is their capacity for self-preservation. They do not fear death. They do not avoid injury. They complete the mission regardless of cost to themselves. This is not courage. It is the absence of self.',
      'There is a Black Rose safehouse somewhere in the colony that has never been found. It contains the records of every operation the agency has ever conducted. If it were ever discovered, it would bring down the government, Noxis, and at least two other agencies.'
    ],
    equipment: [
      {
        name: 'Hollowhead Compound',
        type: 'compound',
        classification: 'CLASSIFIED',
        description: 'An illegal biological compound delivered by injection. Causes progressive internal tissue dissolution over a period of 48-72 hours. The victim remains conscious throughout. There is no known antidote. The compound was originally developed in a government research program and stolen by Black Rose. The government has never publicly acknowledged the compound\'s existence.',
        agencyExclusive: 'blackrose'
      },
      {
        name: 'Stealth Skin',
        type: 'enhancement',
        classification: 'EXPANDED',
        description: 'A biological or technological modification that allows Black Rose operatives to alter their physical appearance to match civilian profiles. Unlike conventional disguise technology, Stealth Skin appears to work at a deeper level — operatives are not merely disguised but genuinely unrecognizable, even to people who know them. The mechanism is unknown.',
        agencyExclusive: 'blackrose'
      }
    ]
  }
];

// ============================================================
// TIMELINE
// ============================================================

export const timeline: TimelineEntry[] = [
  {
    id: 'tl-001',
    year: 'Colony Year 1',
    era: 'FOUNDING ERA',
    title: 'First Atmospheric Seeding — Arsia Mons',
    classification: 'EXPANDED',
    summary: 'The Noxis corporation begins the first large-scale atmospheric seeding operation at the Arsia Mons site. The colony\'s breathable air supply is, from its first day, a corporate product.',
    detail: 'The original terraforming contract awarded to Noxis Atmospheric Solutions granted the corporation exclusive rights to atmospheric production in the Arsia Mons habitation zone for a period of 50 years, renewable at the corporation\'s discretion. The colonial government\'s legal team later argued that the "renewable at the corporation\'s discretion" clause made the contract effectively permanent. The argument was never resolved in court. It did not need to be — Noxis controlled the air.',
    factions: ['noxis', 'gov'],
    tags: ['terraforming', 'oxygen', 'founding', 'contract']
  },
  {
    id: 'tl-002',
    year: 'Colony Year 12',
    era: 'FOUNDING ERA',
    title: 'The Lazarus Incident — Deep Tunnel Survey',
    classification: 'CLASSIFIED',
    summary: 'A government survey team exploring the deep tunnels beneath Arsia Mons discovers a sealed chamber of unknown origin. The report is immediately classified. Three team members die within the year.',
    detail: 'The chamber\'s contents were never publicly disclosed. The survey team\'s lead scientist disappeared six months after the report was filed. A Lazarus operative was seen in the area two days before the disappearance. The chamber was subsequently sealed with government-grade explosive charges — a decision that, in retrospect, suggests the government was more afraid of what was inside than of what might be outside.',
    factions: ['lazarus', 'gov'],
    tags: ['lazarus', 'mystery', 'underground', 'classified', 'founding']
  },
  {
    id: 'tl-003',
    year: 'Colony Year 31',
    era: 'CORPORATE ERA',
    title: 'Noxis Intelligence Division Founded',
    classification: 'EXPANDED',
    summary: 'Noxis establishes its internal intelligence division, officially designated "Environmental Compliance." The division\'s actual mandate is the protection of corporate secrets from government oversight.',
    detail: 'The founding of the Noxis intelligence division marks the beginning of the agency conflict that would define the colony\'s political landscape for the next sixty years. Noxis did not create an intelligence agency to fight the government. It created one to protect itself from the government. The distinction would not survive contact with reality.',
    factions: ['noxis'],
    tags: ['noxis', 'founding', 'corporate', 'intelligence']
  },
  {
    id: 'tl-004',
    year: 'Colony Year 44',
    era: 'CORPORATE ERA',
    title: 'Colonial Independence Declaration — Earth Financial Oversight Severed',
    classification: 'EXPANDED',
    summary: 'The colonial government declares independence from Earth-based financial oversight. The investors who funded the original terraforming do not withdraw — they adapt. Their information network becomes Caliber.',
    detail: 'The independence declaration was the founding moment of the colony\'s political crisis. By severing Earth financial oversight, the government created a power vacuum that Noxis, Caliber, and eventually all five agencies would spend the next fifty years trying to fill. The government\'s assumption that independence meant control proved catastrophically wrong.',
    factions: ['caliber', 'gov'],
    tags: ['caliber', 'independence', 'politics', 'founding', 'earth']
  },
  {
    id: 'tl-005',
    year: 'Colony Year 67',
    era: 'CRISIS ERA',
    title: 'The Noxis Valve Audit — Classified',
    classification: 'CLASSIFIED',
    summary: 'An internal Noxis audit discovers that atmospheric processors in Sectors 12-19 have been secretly modified to include secondary output valves capable of venting breathable air to the Martian exterior.',
    detail: 'The modification was traced to a contractor team that no longer existed as a legal entity. Three former members of that team died within the following year. The audit report was classified at Board level. The valves were never removed. When a junior analyst asked why, she was transferred to deep terraforming operations. Her current status is unknown.',
    factions: ['noxis'],
    tags: ['noxis', 'classified', 'oxygen', 'conspiracy', 'corporate crime']
  },
  {
    id: 'tl-006',
    year: 'Colony Year 71',
    era: 'CRISIS ERA',
    title: 'Caliber\'s ARCHIVIST Investigation — Terminated',
    classification: 'CLASSIFIED',
    summary: 'A Caliber coordinator attempts to compile a complete record of the agency\'s true founding and client structure. The investigation ends with a single-page report: "The question cannot be answered safely."',
    detail: 'ARCHIVIST\'s report is the closest anyone has come to documenting Caliber\'s true nature. The fact that the investigation was terminated rather than completed suggests that the answer exists — and that it is dangerous. ARCHIVIST retired from field work immediately and has never spoken about the investigation.',
    factions: ['caliber'],
    tags: ['caliber', 'classified', 'mystery', 'founding']
  },
  {
    id: 'tl-007',
    year: 'Colony Year 83',
    era: 'RESISTANCE ERA',
    title: 'The Brain-Drain Begins — ARCHITECT\'s Recruitment',
    classification: 'CLASSIFIED',
    summary: 'Recovered communications show a coordinated recruitment effort targeting government technical staff, two years before the government noticed the problem. The recruiter used the codename ARCHITECT.',
    detail: 'ARCHITECT promised recruits "a network where your work matters." The identity of ARCHITECT has never been established. Static operatives treat ARCHITECT as a founding myth — a ghost who built their world and then disappeared into it. The government\'s investigation into ARCHITECT was closed without conclusion.',
    factions: ['static', 'gov'],
    tags: ['static', 'founding', 'brain-drain', 'mystery']
  },
  {
    id: 'tl-008',
    year: 'Colony Year 85',
    era: 'RESISTANCE ERA',
    title: 'Static Agency Founded — Government\'s Mistake',
    classification: 'CANON',
    summary: 'The government creates Static as a technologically savvy anti-government agency to replace its missing technical workforce. The recruits immediately turn against their creators.',
    detail: 'The founding of Static is the government\'s most consequential mistake. By creating a formal structure for the colony\'s most technically gifted anti-government operatives and then giving them access to satellite systems and government network credentials, the Colonial Authority effectively armed its own opposition. Static was operational against the government within six months of its founding.',
    factions: ['static', 'gov'],
    tags: ['static', 'founding', 'government', 'canon']
  },
  {
    id: 'tl-009',
    year: 'Colony Year 87',
    era: 'RESISTANCE ERA',
    title: 'Lazarus Destroys Government Research Facility',
    classification: 'EXPANDED',
    summary: 'Lazarus operatives destroy the government\'s classified research facility studying the resurrection phenomenon. All research records are lost. Three government researchers are killed.',
    detail: 'The destruction of the research facility marked the end of the government\'s systematic attempt to understand and replicate Lazarus\'s resurrection ability. The facility\'s lead researcher disappeared the same day. The government has never publicly acknowledged the facility\'s existence or its destruction.',
    factions: ['lazarus', 'gov'],
    tags: ['lazarus', 'government', 'classified', 'destruction']
  },
  {
    id: 'tl-010',
    year: 'Colony Year 88',
    era: 'CURRENT ERA',
    title: 'Static Breaches Government Intelligence Archive',
    classification: 'EXPANDED',
    summary: 'Static\'s most significant operation to date. The breach exposes the existence of PROJECT THORNFIELD, the Lazarus research program, and multiple classified government directives.',
    detail: 'The Colony Year 88 breach is the event that made the current intelligence war visible. Before the breach, the five agencies operated in a shadow conflict that most colonists were unaware of. After the breach, the government\'s secrets were partially exposed — and the government\'s response made the conflict impossible to ignore. The "cleansing" protocol referenced in the game\'s plot summary is believed to be the government\'s response to the breach.',
    factions: ['static', 'gov', 'blackrose', 'lazarus'],
    tags: ['static', 'government', 'breach', 'current', 'canon']
  },
  {
    id: 'tl-011',
    year: 'Colony Year 89',
    era: 'CURRENT ERA',
    title: 'The Cleansing Protocol — Active',
    classification: 'CANON',
    summary: 'The government activates its cleansing protocol — a contingency plan to eliminate all agency operatives and purge the colony of organized resistance. The five agencies race to steal the government\'s secrets before the cleansing is complete.',
    detail: 'This is the present moment of the game\'s events. The cleansing protocol is the government\'s answer to decades of agency activity. The agencies\' response — stealing three top secrets and beaming out before the colony is "cleansed" — is the core gameplay loop. What the secrets contain, and what the cleansing actually means for the colony\'s population, is never fully explained in the game.',
    factions: ['gov', 'noxis', 'static', 'caliber', 'lazarus', 'blackrose'],
    tags: ['current', 'cleansing', 'canon', 'game events']
  }
];

// ============================================================
// DISTRICTS
// ============================================================

export const districts: District[] = [
  {
    id: 'dist-001',
    name: 'The Habitation Ring',
    sector: 'Sectors 1-8',
    classification: 'EXPANDED',
    controlledBy: 'gov',
    description: 'The primary residential zone of the Arsia Mons colony. Population approximately 180,000. Government-controlled surface infrastructure with significant underground agency activity.',
    expandedDescription: 'The Habitation Ring is where most colonists live and where most of them will die. The government maintains visible control through a network of defense lasers, patrol robots, and civilian surveillance terminals. Below the surface, in the maintenance tunnels and sealed sub-levels, every agency has at least one active safehouse. The government knows this. The agencies know the government knows. The resulting tension has produced a surface that looks orderly and an underground that is perpetually at war.',
    knownLocations: ['Government Administrative Center (Sector 3)', 'Noxis Atmospheric Processing Station 7 (Sector 7)', 'Caliber-controlled commercial district (Sector 5)', 'Static safehouse network (Grid 44-North — compromised)'],
    dangerLevel: 3,
    rumors: [
      'The government\'s civilian surveillance terminals are not just watching for agency activity. They are collecting data on every colonist\'s behavior, associations, and political views. The data is being used to build a list.',
      'There is a tunnel system beneath Sector 6 that connects to every other sector. It was built by the original construction teams and never officially documented. Every agency uses it. None of them knows the others use it too.'
    ]
  },
  {
    id: 'dist-002',
    name: 'The Deep Tunnels',
    sector: 'Sub-Level 3 and below',
    classification: 'CLASSIFIED',
    controlledBy: 'contested',
    description: 'The unmapped tunnel network beneath the colony. Government surveys have documented approximately 30% of the tunnel system. The rest is unknown.',
    expandedDescription: 'The Deep Tunnels are the colony\'s true frontier. The government\'s survey maps end at Sub-Level 3. Below that, the tunnels were carved by geological processes that predate human arrival — and, according to the classified survey reports, by something else. The sealed chamber discovered in Colony Year 12 is somewhere in Sub-Level 7. The explosive charges used to seal it have never been verified as effective. Lazarus operatives are the only agency known to operate regularly in the Deep Tunnels. What they do there is unknown.',
    knownLocations: ['The Sealed Chamber (Sub-Level 7 — location classified)', 'Lazarus operational zone (Sub-Level 4-6)', 'Unknown — survey data incomplete'],
    dangerLevel: 5,
    rumors: [
      'The Deep Tunnels extend beyond the colony\'s footprint — far beyond. Some survey teams that went too deep never came back. The government stopped sending survey teams in Colony Year 55.',
      'There is breathable air in the Deep Tunnels, below the level where Noxis\'s atmospheric processors reach. The source of that air is unknown.'
    ]
  },
  {
    id: 'dist-003',
    name: 'The Satellite Array',
    sector: 'Orbital / Surface Grid 90-North',
    classification: 'EXPANDED',
    controlledBy: 'contested',
    description: 'The colony\'s orbital communication and surveillance infrastructure. Nominally government-controlled. Actually contested between the government, Static, and Noxis.',
    expandedDescription: 'The Satellite Array is the most strategically valuable piece of infrastructure in the colony after the atmospheric processors. Whoever controls the satellites controls communication, surveillance, and the ability to coordinate operations across the entire colony. The government built the array. Static has been systematically compromising it for three years. Noxis has been quietly purchasing access to specific satellites through shell companies. The current state of the array\'s control is genuinely unclear — even to the agencies involved.',
    knownLocations: ['Government Satellite Control Center (Grid 90-North)', 'Static relay nodes (locations classified)', 'Noxis private satellite access terminal (location unknown)'],
    dangerLevel: 4,
    rumors: [
      'Static\'s "Satellite Blind" event was not a demonstration of capability. It was a side effect of something else they were doing with the satellites. What they were actually doing has never been determined.',
      'One of the satellites in the array is not a government satellite. It was placed in orbit by an unknown party approximately twenty years ago. The government knows it\'s there. They don\'t know who put it there or what it does.'
    ]
  }
];

// ============================================================
// CLASSIFIED FILES
// ============================================================

export const classifiedFiles: ClassifiedFile[] = [
  {
    id: 'cf-001',
    title: 'PROJECT THORNFIELD — Final Report',
    classification: 'CLASSIFIED',
    date: 'Colony Year 82',
    author: 'Government Intelligence Division — Research Program Lead [IDENTITY REDACTED]',
    content: `CLASSIFICATION: EYES ONLY — COLONIAL AUTHORITY DIRECTOR LEVEL

PROJECT THORNFIELD — FINAL REPORT
Research Program: Black Rose Operative Analysis
Duration: Colony Years 71-82
Status: TERMINATED

EXECUTIVE SUMMARY:
Eleven years of research into Black Rose operative psychology and capability have produced a single actionable conclusion: we do not understand what we are dealing with.

Black Rose operatives are not augmented in any conventional sense. Standard medical scanning reveals no implants, no chemical augmentation, no biological modification that corresponds to known enhancement technology. And yet their capabilities — particularly their capacity to operate without apparent emotional response and to sustain injuries that would incapacitate standard operatives — are documented and reproducible.

The psychological profiles assembled over eleven years suggest a process of identity replacement rather than modification. Operatives who were identified prior to their Black Rose recruitment show complete personality discontinuity post-recruitment. They retain skills and memories but demonstrate no emotional connection to their pre-recruitment identity. They do not recognize former associates. They do not respond to personal appeals.

What replaces the original identity is not a programmed response set. It is something more coherent and more disturbing: a genuine alternative self, with its own preferences, its own aesthetic (the Hollowhead compound, the isolation, the precision), and its own apparent sense of purpose.

We do not know what that purpose is.

RECOMMENDATION: Immediate termination of this research program and destruction of all records. The subject matter poses a risk to research personnel that we are not equipped to manage.

[END OF REPORT]

[NOTE: This document was recovered in the Static breach of Colony Year 88. The lead researcher disappeared the same day the program was terminated. Their current status is unknown.]`,
    relatedFactions: ['blackrose', 'gov'],
    tags: ['black rose', 'classified', 'psychology', 'government research'],
    isLocked: false
  },
  {
    id: 'cf-002',
    title: 'NOXIS VALVE AUDIT — Internal Memorandum',
    classification: 'CLASSIFIED',
    date: 'Colony Year 67',
    author: 'Noxis Environmental Compliance Division — Audit Team 3',
    content: `NOXIS ATMOSPHERIC SOLUTIONS
INTERNAL MEMORANDUM — BOARD LEVEL CLASSIFICATION

RE: Atmospheric Processor Audit — Sectors 12-19
Audit Team: 3
Date: Colony Year 67, Month 4

FINDINGS:
During routine maintenance inspection of atmospheric processors in Sectors 12 through 19, Audit Team 3 discovered the presence of secondary output valves not present in the original installation specifications.

The valves are positioned to direct atmospheric output to exterior venting rather than interior habitation distribution. In their current configuration, they are inactive. In an activated configuration, they would redirect breathable air from Sectors 12-19 to the Martian exterior at a rate sufficient to reduce habitable oxygen levels in those sectors to non-survivable concentrations within approximately 4 hours.

The modification was traced to contractor team DELTA-7, which completed installation work on the processors in Colony Year 28. DELTA-7 no longer exists as a legal entity. Former team members are being located for interview.

RECOMMENDATION: Immediate removal of secondary valves and investigation of contractor team.

BOARD RESPONSE [HANDWRITTEN]: Do not remove. Do not investigate further. Classify this report. Transfer the analyst who filed it.

[ANALYST NOTE: The "transfer" notation refers to the junior analyst who flagged the discovery. She was transferred to deep terraforming operations. Her current status is unknown. The valves remain in place.]`,
    relatedFactions: ['noxis'],
    tags: ['noxis', 'oxygen', 'classified', 'corporate crime', 'conspiracy'],
    isLocked: false
  },
  {
    id: 'cf-003',
    title: 'DEAD SIGNAL BROADCAST — ARCHITECT TRANSMISSION',
    classification: 'CLASSIFIED',
    date: 'Colony Year 83',
    author: 'ARCHITECT [IDENTITY UNKNOWN]',
    content: `DEAD SIGNAL NETWORK — ENCRYPTED BROADCAST
RECIPIENT: [TARGETED DISTRIBUTION — GOVERNMENT TECHNICAL STAFF]
SENDER: ARCHITECT
DATE: Colony Year 83, Month 2

You have been watched for some time. Not by the government — they watch everyone. By us.

You are good at what you do. Better than they deserve. You know this. You have known it for years. You have watched your work disappear into systems that use it to control people who never asked to be controlled, and you have told yourself that this is simply how things are.

It is not simply how things are. It is how they have chosen to make things.

There is a network. It exists outside the government's infrastructure, outside Noxis's atmospheric grid, outside Caliber's information markets. It is a place where your work matters — not as a tool for someone else's agenda, but as a thing in itself.

We are not asking you to fight. We are asking you to disappear. Come to the network. Bring what you know. Build something that belongs to you.

The address follows. It will not be sent twice.

— ARCHITECT

[ANALYST NOTE: This transmission was recovered from the Static breach of Colony Year 88. It is one of approximately 340 similar transmissions sent to government technical staff between Colony Years 83 and 85. ARCHITECT's identity has never been established. The government's investigation into ARCHITECT was closed without conclusion in Colony Year 86.]`,
    relatedFactions: ['static', 'gov'],
    tags: ['static', 'founding', 'brain-drain', 'mystery', 'architect'],
    isLocked: false
  },
  {
    id: 'cf-004',
    title: 'LAZARUS CYCLE MARKER — INTERCEPTED TRANSMISSION',
    classification: 'CLASSIFIED',
    date: 'Colony Year 89',
    author: 'LAZARUS — SOURCE UNKNOWN',
    content: `[TRANSMISSION INTERCEPTED BY STATIC — DEAD SIGNAL RELAY NODE 7]
[DECRYPTION: PARTIAL — APPROXIMATELY 60% RECOVERED]

LAZARUS INTERNAL TRANSMISSION
CYCLE MARKER: 89
[RECIPIENT: UNKNOWN]

The [CORRUPTED] approaches. Those who have completed the [CORRUPTED] will [CORRUPTED] before the end of the year. Those who have not will [CORRUPTED].

The chamber beneath [CORRUPTED] remains sealed. The government believes their charges were sufficient. They were not. The [CORRUPTED] inside is intact.

The [CORRUPTED] does not know what it found. It does not know what it [CORRUPTED]. It does not know that the [CORRUPTED] has been watching since [CORRUPTED].

The cleansing protocol is [CORRUPTED]. This is expected. The cycle has survived [CORRUPTED] cleansings. It will survive this one.

[CORRUPTED] — complete the work.

[END OF RECOVERED TRANSMISSION]

[ANALYST NOTE: This transmission was intercepted by Static and shared with this archive. The corrupted sections could not be recovered. The reference to "the chamber beneath [CORRUPTED]" is believed to refer to the sealed chamber discovered in Colony Year 12. The phrase "the cycle has survived [CORRUPTED] cleansings" suggests that the current cleansing protocol is not the first — that the government has attempted to eliminate the agencies before, and failed.]`,
    relatedFactions: ['lazarus', 'gov', 'static'],
    tags: ['lazarus', 'classified', 'cycle', 'mystery', 'cleansing'],
    isLocked: false
  },
  {
    id: 'cf-005',
    title: 'CALIBER INTERNAL BULLETIN — THE CLIENT QUESTION',
    classification: 'REDACTED',
    date: 'Colony Year 71',
    author: 'ARCHIVIST [IDENTITY REDACTED]',
    content: `CALIBER INTERNAL — COORDINATOR LEVEL
AUTHOR: ARCHIVIST
DATE: Colony Year 71, Month 7

I have spent three months attempting to answer a question that I was told was unanswerable. I was told this by people who had clearly already answered it and found the answer unacceptable.

The question is: who is the client?

Caliber pays its operatives extraordinarily well for even routine intelligence. The payment structure makes no economic sense unless someone is paying Caliber to collect that intelligence — paying at a rate that makes even the most mundane data valuable. The client, whoever they are, has resources that exceed anything available within the colony.

The client is not on Mars.

I cannot prove this. But the payment structure, the collection priorities, the specific categories of information that Caliber has been systematically accumulating for [REDACTED] years — they point to an interest that is observing the colony from outside. An interest that has been watching since before the independence declaration. An interest that is waiting for something.

I do not know what they are waiting for.

I recommend ceasing this inquiry. The question cannot be answered safely. Whatever the client is waiting for, they do not want to be found before it happens.

— ARCHIVIST

[THIS DOCUMENT IS CLASSIFIED AT A LEVEL THAT MOST CALIBER OPERATIVES DID NOT KNOW EXISTED]
[ARCHIVIST RETIRED FROM FIELD WORK IMMEDIATELY AFTER SUBMITTING THIS REPORT]
[ARCHIVIST'S CURRENT STATUS: UNKNOWN]`,
    relatedFactions: ['caliber'],
    tags: ['caliber', 'classified', 'client', 'mystery', 'earth'],
    isLocked: true
  }
];

// ============================================================
// CONSPIRACIES
// ============================================================

export const conspiracies: Conspiracy[] = [
  {
    id: 'con-001',
    title: 'The Oxygen Kill Switch',
    classification: 'CLASSIFIED',
    status: 'partially_confirmed',
    summary: 'Noxis has the technical capability to reduce oxygen output to any sector within 90 seconds, effectively using the colony\'s air supply as a weapon.',
    evidence: [
      'The Colony Year 67 valve audit confirmed the existence of secondary venting mechanisms in Sectors 12-19.',
      'Noxis has never publicly denied the capability.',
      'Three former Noxis engineers have independently described "emergency atmospheric reclamation" protocols in their testimonies — all three subsequently disappeared.',
      'The original terraforming contract contains a clause for "atmospheric reclamation in the event of colony dissolution" — a phrase that has never been legally defined.'
    ],
    factions: ['noxis', 'gov'],
    analystNote: 'The valve audit is confirmed. The capability is real. The question is whether Noxis has ever used it — and whether the government knows. The government\'s continued tolerance of Noxis\'s monopoly position suggests either that they don\'t know, or that they do and are complicit.'
  },
  {
    id: 'con-002',
    title: 'ARCHITECT\'s True Identity',
    classification: 'CLASSIFIED',
    status: 'unverified',
    summary: 'The mysterious figure who organized the brain-drain and founded Static was not a disaffected programmer but a government intelligence director who deliberately created the agency as a controlled opposition.',
    evidence: [
      'The brain-drain was too organized to be spontaneous — it required infrastructure that would have taken years to build.',
      'The government\'s investigation into ARCHITECT was closed without conclusion despite having access to the recruitment transmissions.',
      'Static\'s satellite access codes were government-issued — suggesting someone with government access provided them.',
      'The government\'s response to Static has been consistently ineffective despite having created the agency and knowing its capabilities.'
    ],
    factions: ['static', 'gov'],
    analystNote: 'If ARCHITECT was a government actor, the question becomes: what was the purpose? A controlled opposition that got out of control? A deliberate destabilization operation? Or something else entirely? The evidence is circumstantial but the pattern is suggestive.'
  },
  {
    id: 'con-003',
    title: 'The Lazarus Pre-Colony Presence',
    classification: 'CLASSIFIED',
    status: 'unverified',
    summary: 'Lazarus was operating on Mars before the first human colonists arrived. The sealed chamber beneath Arsia Mons is evidence of their pre-colonial presence.',
    evidence: [
      'The game bio states Lazarus has been "resurfacing every hundred years." The colony is approximately 90 years old.',
      'The sealed chamber discovered in Colony Year 12 contained equipment of "unknown manufacture and purpose."',
      'The chamber was sealed with explosive charges rather than studied — suggesting the government found something it could not explain and chose to bury rather than understand.',
      'Lazarus operatives are the only agency known to operate in the Deep Tunnels, below the level of government survey data.'
    ],
    factions: ['lazarus', 'gov'],
    analystNote: 'The hundred-year cycle claim is either mythology or evidence of something that defies conventional explanation. The government\'s response to the sealed chamber — immediate classification, explosive sealing, elimination of witnesses — suggests they found the latter more likely.'
  },
  {
    id: 'con-004',
    title: 'The Caliber Client',
    classification: 'REDACTED',
    status: 'unverified',
    summary: 'Caliber is collecting intelligence on behalf of an Earth-based interest that has been monitoring the colony since before the independence declaration, waiting for an unknown triggering event.',
    evidence: [
      'ARCHIVIST\'s report concluded that the client "is not on Mars."',
      'Caliber\'s payment structure makes no economic sense without an external funding source.',
      'The specific categories of intelligence Caliber collects suggest a systematic effort to build a complete picture of the colony\'s political and military situation.',
      'Caliber was founded at approximately the same time as the independence declaration — suggesting the Earth investors who lost financial oversight created an intelligence network to maintain their interests.'
    ],
    factions: ['caliber'],
    analystNote: 'ARCHIVIST\'s report is the most credible evidence for this theory. The fact that the report was classified at a level most Caliber operatives didn\'t know existed suggests that Caliber\'s own leadership knows the truth — and has chosen to keep it from their operatives.'
  },
  {
    id: 'con-005',
    title: 'The Previous Cleansings',
    classification: 'CLASSIFIED',
    status: 'unverified',
    summary: 'The current cleansing protocol is not the first. The government has attempted to eliminate the agencies before, and failed. The agencies have survived multiple cleansings across the colony\'s history.',
    evidence: [
      'The intercepted Lazarus transmission references "the cycle has survived [CORRUPTED] cleansings" — suggesting multiple prior attempts.',
      'Caliber\'s founding predates available records, suggesting the agency survived whatever preceded the current political order.',
      'The government\'s institutional knowledge of the agencies is surprisingly limited given the colony\'s age — consistent with records being destroyed or suppressed after previous conflicts.',
      'Black Rose has no known founding date and no known origin — consistent with an organization that has survived multiple cycles of government suppression.'
    ],
    factions: ['gov', 'lazarus', 'blackrose', 'caliber'],
    analystNote: 'If the cleansing protocol has been used before, the current conflict is not a crisis — it is a recurring pattern. The agencies may have institutional knowledge of how to survive it. The government may have institutional knowledge of how to execute it. Both sides may be playing a game with known rules that neither side has disclosed.'
  }
];

// ============================================================
// WEAPONS & EQUIPMENT (General)
// ============================================================

export const weapons: Equipment[] = [
  {
    name: 'Blaster',
    type: 'weapon',
    classification: 'CANON',
    description: 'Standard-issue energy weapon. The most common weapon in the colony. Available to all agencies. Reliable, accurate at medium range, and capable of sustained fire. The government\'s security forces use a modified version with a tracking chip that Silencers have learned to disable.'
  },
  {
    name: 'Rocket Launcher',
    type: 'weapon',
    classification: 'CANON',
    description: 'High-damage area weapon. Effective against both personnel and infrastructure. The explosion radius makes it dangerous in enclosed spaces — a fact that has contributed to several friendly fire incidents in the colony\'s tunnel network.'
  },
  {
    name: 'Jet Pack',
    type: 'tool',
    classification: 'CANON',
    description: 'Personal flight device. Standard equipment for all Silencers. Provides approximately five seconds of flight before requiring recharge. Can be upgraded for extended air time. Noxis agents\' enhanced lung capacity and oxygen processing gives them a slight advantage in jet pack endurance.'
  },
  {
    name: 'Disguise Module',
    type: 'tool',
    classification: 'CANON',
    description: 'Electronic disguise system that allows a Silencer to appear as a civilian NPC to guards, robots, and defense lasers. Deactivated immediately upon firing a weapon or taking damage. The module works by broadcasting a civilian identification signal — a vulnerability that Static has been attempting to exploit for years.'
  },
  {
    name: 'Hollowhead Injector',
    type: 'compound',
    classification: 'CLASSIFIED',
    description: 'Black Rose\'s signature weapon. An illegal biological compound that causes progressive internal tissue dissolution over 48-72 hours. The victim remains conscious throughout. No known antidote. The injector is designed to leave no external marks — the victim appears healthy until the internal damage becomes too severe to conceal.',
    agencyExclusive: 'blackrose'
  }
];

export const allFactionIds: FactionId[] = ['noxis', 'static', 'caliber', 'lazarus', 'blackrose'];
