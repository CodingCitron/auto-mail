const Schedule = (sequelize, DataTypes, option) => {
	const Schedule = sequelize.define(
		"Schedule",
		{
			// writer: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false, //필수
			// },
			title: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false
			},
		},
		{
            ...option,
			modelName: 'Schedule', // 자바스크립트에서 사용하는 이름
			tableName: 'schedules', // 실제 디비에서 사용하는 이름
		},
	);

	Schedule.associate = (db) => {
        db.Schedule.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id', onDelete: 'cascade' })
		db.Schedule.hasMany(db.Timer, { foreignKey: 'creater', sourceKey: 'id' })
	};

	return Schedule;
};

export default Schedule;