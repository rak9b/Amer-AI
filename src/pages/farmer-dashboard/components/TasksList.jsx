import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TasksList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Apply fertilizer to rice field",
      description: "NPK fertilizer application for flowering stage",
      priority: "high",
      dueDate: "Today",
      completed: false,
      category: "fertilizer"
    },
    {
      id: 2,
      title: "Check irrigation system",
      description: "Inspect water flow and repair if needed",
      priority: "medium",
      dueDate: "Tomorrow",
      completed: false,
      category: "irrigation"
    },
    {
      id: 3,
      title: "Harvest tomatoes",
      description: "Pick ripe tomatoes from greenhouse",
      priority: "high",
      dueDate: "Today",
      completed: true,
      category: "harvest"
    },
    {
      id: 4,
      title: "Pest inspection",
      description: "Check potato plants for pest damage",
      priority: "medium",
      dueDate: "In 2 days",
      completed: false,
      category: "pest"
    }
  ]);

  const toggleTask = (taskId) => {
    setTasks(tasks?.map(task => 
      task?.id === taskId ? { ...task, completed: !task?.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fertilizer': return 'Sprout';
      case 'irrigation': return 'Droplets';
      case 'harvest': return 'Wheat';
      case 'pest': return 'Bug';
      default: return 'CheckSquare';
    }
  };

  const pendingTasks = tasks?.filter(task => !task?.completed);
  const completedTasks = tasks?.filter(task => task?.completed);

  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-semibold text-lg text-foreground">Today's Tasks</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {completedTasks?.length}/{tasks?.length} completed
          </span>
          <Icon name="CheckCircle" size={16} className="text-success" />
        </div>
      </div>
      <div className="space-y-3">
        {pendingTasks?.map((task) => (
          <div key={task?.id} className="border border-border rounded-organic p-4 hover-magnetic">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => toggleTask(task?.id)}
                className="mt-1 w-5 h-5 border-2 border-muted-foreground rounded-organic-sm flex items-center justify-center hover:border-primary transition-natural"
              >
                {task?.completed && <Icon name="Check" size={12} className="text-primary" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-poppins font-medium ${task?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task?.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Icon name={getCategoryIcon(task?.category)} size={14} className="text-primary" />
                    <span className={`text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                      {task?.priority?.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{task?.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {task?.dueDate}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconSize={12}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {completedTasks?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h4 className="font-poppins font-medium text-sm text-muted-foreground mb-3">Completed Today</h4>
            {completedTasks?.map((task) => (
              <div key={task?.id} className="flex items-center space-x-3 py-2 opacity-60">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm line-through text-muted-foreground">{task?.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;