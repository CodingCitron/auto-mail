const File = (sequelize, DataTypes, option) => {
    const File = sequelize.define(
        "File",
        {   
            original_name: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            urn: {
                type: DataTypes.STRING(200),
				allowNull: false,
            },
            path: {
                type: DataTypes.STRING(200),
				allowNull: false,
            }
        },
        {
            ...option,
			modelName: 'File', // 자바스크립트에서 사용하는 이름
			tableName: 'files', // 실제 디비에서 사용하는 이름
        }
    )

    File.associate = (db) => {
        db.File.belongsTo(db.User, { foreignKey: 'upload_id', targetKey: 'id' })
	};

    return File
}

export default File;