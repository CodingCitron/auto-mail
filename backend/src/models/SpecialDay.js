import { Sequelize } from "sequelize"

const SpecialDay = (sequelize, DataTypes, option) => {
    const SpecialDay = sequelize.define(
        "SpecialDay",
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            date: {
                type:DataTypes.DATE,
                allowNull: false
            },
            isHoliday: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            ...option,
            modelName: 'SpecialDay',
            tableName: 'special_day', 
        }
    )

    SpecialDay.associate = (db) => {}

    return SpecialDay
}

export default SpecialDay