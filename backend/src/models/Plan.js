const Plan = (sequelize, DataTypes, option) => {
	const Plan = sequelize.define(
		"Plan",
		{
			// writer: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false, //필수
			// },
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY) 
				allowNull: false,
				defaultValue: DataTypes.NOW,
			}
		},
		{
            ...option,
			modelName: 'Plan', // 자바스크립트에서 사용하는 이름
			tableName: 'plans', // 실제 디비에서 사용하는 이름
		},
	);

	Plan.associate = (db) => {
        db.Plan.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id', onDelete: 'cascade' })
		db.Plan.hasMany(db.Timer, { foreignKey: 'planner', sourceKey: 'id' })
	};

	return Plan;
};

export default Plan;