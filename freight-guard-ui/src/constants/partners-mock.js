export const contractorPartnersMock = [
  {
    id: "PRC-201",
    name: "Expresso Sul Ltda",
    logoLetter: "E",
    status: "Ativo",
    fleetReady: 14,
    lanesCovered: 8,
    avgResponseTime: "12 min",
    lastFreight: "Hoje, 09:20",
  },
  {
    id: "PRC-202",
    name: "Rota Norte Logística",
    logoLetter: "R",
    status: "Pendente de Aceite",
    fleetReady: 9,
    lanesCovered: 5,
    avgResponseTime: "Aguardando aceite",
    lastFreight: "Convite enviado há 2h",
  },
  {
    id: "PRC-203",
    name: "TransVale Transportes",
    logoLetter: "T",
    status: "Encerrado",
    fleetReady: 0,
    lanesCovered: 2,
    avgResponseTime: "Desativado",
    lastFreight: "Última operação em 18/05",
  },
]

export const carrierPartnersMock = [
  {
    id: "EMB-301",
    name: "Volvo Cars do Brasil",
    logoLetter: "V",
    status: "Ativo",
    openOffers: 4,
    currentLanes: 3,
    inviteCode: "VOLVO-8421",
  },
  {
    id: "EMB-302",
    name: "Indústrias Alpha",
    logoLetter: "A",
    status: "Pendente de Aceite",
    openOffers: 2,
    currentLanes: 1,
    inviteCode: "ALPHA-2210",
  },
  {
    id: "EMB-303",
    name: "TechLogistics",
    logoLetter: "T",
    status: "Encerrado",
    openOffers: 0,
    currentLanes: 0,
    inviteCode: "TECH-0031",
  },
]

export const carrierInviteInboxMock = [
  {
    id: "INV-910",
    contractor: "Indústrias Alpha",
    code: "ALPHA-2210",
    contact: "Juliana Costa",
    corridor: "Joinville -> Campinas",
  },
]

export const contractorInviteTemplate = {
  contractor: "Sigma Foods",
  code: "SIG-4821",
  link: "https://sigloc.app/invite/SIG-4821",
  expiresAt: "Expira em 48h",
}