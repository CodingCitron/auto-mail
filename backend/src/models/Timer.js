const Timer = (sequelize, DataTypes, option) => {
	const Timer = sequelize.define(
		"Timer",
		{
			// planner: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false, //필수
			// },
			date: {
				type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY) 
				allowNull: true,
			},
			time: { // 어느 시간에 보낼지
				type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY) 
				allowNull: true,
			},
			type: {
				type: DataTypes.STRING(10),
				allowNull: false
			},
            count: { // 보내는 횟수 
                type: DataTypes.INTEGER, 
				allowNull: false,
            },
            count_history: { // 보낸 횟수
                type: DataTypes.INTEGER,
                allowNull: true,
				defaultValue: 0
            },
			status: {
				type: DataTypes.STRING(10),
				allowNull: true
			},
			created_at: {  // 생성 시간
				type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY)  
				allowNull: false,
				defaultValue: DataTypes.NOW,
			}
		},
		{
            ...option,
			modelName: 'Timer', // 자바스크립트에서 사용하는 이름
			tableName: 'timers', // 실제 디비에서 사용하는 이름
		},
	);

	Timer.associate = (db) => {
        db.Timer.belongsTo(db.User, { foreignKey: 'creater_id', targetKey: 'id', onDelete: 'cascade' })
        db.Timer.belongsTo(db.Schedule, { foreignKey: 'schedule_id', targetKey: 'id', onDelete: 'cascade' })
	};

	return Timer;
};

export default Timer;