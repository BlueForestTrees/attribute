import {cols} from "../../src/collections"
import {withEntry} from "test-api-express-mongo"


export const vitCDamageEntry = withEntry("5a6a03c03e77667641d2d2c4", "Ivitamine C", "Dens")
export const vitBDamageEntry = withEntry("5a6a03c03e77667641d2d2c5", "Ivitamine B", "Dens")
export const prixDamageEntry = withEntry("5a6a03c03e77667641d2d2c6", "IPrix", "Coût")
export const vitDDamageEntry = withEntry("5a6a03c03e77667641d2d2c7", "Ivitamine D",  "Dens")
export const vitEDamageEntry = withEntry("5a6a03c03e77667641d2d2c8", "Ivitamine E",  "Dens")
export const co2eDamageEntry = withEntry("5a6a03c03e77667641d2d2c9", "équivalent CO2",  "Mass")

vitBDamageEntry.eq = "CO2"

export const database = {
    [cols.DAMAGE_ENTRY]: [vitDDamageEntry, vitEDamageEntry, co2eDamageEntry, vitCDamageEntry, vitBDamageEntry, prixDamageEntry]
}
