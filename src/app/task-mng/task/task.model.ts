export class Task {
	public id: number;
	public taskTitle: string;
	public badgeClass: string
	public description: string;
	public messageType: string; //text, image
	public messageCount: string;
	public linkCount: string;
	public createdOn: string;
	public createdBy: string;
	public assignedTo: any;
	public isUserImg: boolean;
	public status: string;

	constructor(taskId: number, taskTitle: string, badgeClass: string, description: string, messageType: string, messageCount: string,linkCount: string, createdOn: string, createdBy: string, assignedTo: any, isUserImg: boolean, status: string) {
		this.id = taskId;
		this.taskTitle = taskTitle;
		this.badgeClass = badgeClass;
		this.description = description;
		this.messageType = messageType;
		this.messageCount = messageCount;
		this.linkCount =linkCount;
		this.createdOn = createdOn;
		this.createdBy = createdBy;
		this.assignedTo = assignedTo;
		this.isUserImg = isUserImg;
		this.status = status;
	}
}
