"""
API Tests for Task Manager Backend

Requirements:
    pip install pytest requests

Run tests:
    pytest test_api.py -v

Make sure backend is running on http://localhost:3001
"""

import pytest
import requests
from typing import Optional

BASE_URL = "http://localhost:3001"


class TestTasksAPI:
    """Tests for /tasks endpoints"""
    
    created_task_id: Optional[str] = None
    
    def test_01_create_task_success(self):
        """Test creating a new task with valid data"""
        payload = {
            "title": "Test Task from Python",
            "description": "This is a test task created by pytest",
            "status": "PENDING"
        }
        response = requests.post(f"{BASE_URL}/tasks", json=payload)
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["description"] == payload["description"]
        assert data["status"] == "PENDING"
        assert "id" in data
        assert "createdAt" in data
        assert "updatedAt" in data
        
        # Save ID for later tests
        TestTasksAPI.created_task_id = data["id"]
        print(f"\nCreated task with ID: {TestTasksAPI.created_task_id}")
    
    def test_02_create_task_validation_error(self):
        """Test validation: title is required and min 3 chars"""
        # Missing title
        response = requests.post(f"{BASE_URL}/tasks", json={})
        assert response.status_code == 400
        
        # Title too short
        response = requests.post(f"{BASE_URL}/tasks", json={"title": "ab"})
        assert response.status_code == 400
    
    def test_03_get_all_tasks(self):
        """Test listing all tasks"""
        response = requests.get(f"{BASE_URL}/tasks")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1, "Should have at least one task"
        print(f"\nTotal tasks: {len(data)}")
    
    def test_04_get_tasks_filtered_by_status(self):
        """Test filtering tasks by status"""
        response = requests.get(f"{BASE_URL}/tasks", params={"status": "PENDING"})
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        for task in data:
            assert task["status"] == "PENDING"
        print(f"\nPending tasks: {len(data)}")
    
    def test_05_get_single_task(self):
        """Test getting a single task by ID"""
        assert TestTasksAPI.created_task_id is not None, "No task ID available"
        
        response = requests.get(f"{BASE_URL}/tasks/{TestTasksAPI.created_task_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == TestTasksAPI.created_task_id
        assert data["title"] == "Test Task from Python"
    
    def test_06_get_task_not_found(self):
        """Test getting a non-existent task"""
        fake_id = "00000000-0000-0000-0000-000000000000"
        response = requests.get(f"{BASE_URL}/tasks/{fake_id}")
        
        assert response.status_code == 404
    
    def test_07_update_task(self):
        """Test updating a task"""
        assert TestTasksAPI.created_task_id is not None, "No task ID available"
        
        payload = {
            "title": "Updated Task Title",
            "status": "IN_PROGRESS",
            "priority": 2
        }
        response = requests.patch(
            f"{BASE_URL}/tasks/{TestTasksAPI.created_task_id}",
            json=payload
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Updated Task Title"
        assert data["status"] == "IN_PROGRESS"
        assert data["priority"] == 2
    
    def test_08_update_task_partial(self):
        """Test partial update (only description)"""
        assert TestTasksAPI.created_task_id is not None, "No task ID available"
        
        payload = {"description": "Updated description only"}
        response = requests.patch(
            f"{BASE_URL}/tasks/{TestTasksAPI.created_task_id}",
            json=payload
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["description"] == "Updated description only"
        # Title should remain unchanged
        assert data["title"] == "Updated Task Title"
    
    def test_09_delete_task(self):
        """Test deleting a task"""
        assert TestTasksAPI.created_task_id is not None, "No task ID available"
        
        response = requests.delete(f"{BASE_URL}/tasks/{TestTasksAPI.created_task_id}")
        
        assert response.status_code == 200
        
        # Verify task is deleted
        response = requests.get(f"{BASE_URL}/tasks/{TestTasksAPI.created_task_id}")
        assert response.status_code == 404
        print(f"\nDeleted task: {TestTasksAPI.created_task_id}")


class TestAIAPI:
    """Tests for /ai endpoints"""
    
    task_ids: list = []
    
    @classmethod
    def setup_class(cls):
        """Create test tasks for AI tests"""
        tasks = [
            {"title": "Completar informe mensual", "description": "Preparar el informe de ventas del mes", "status": "PENDING"},
            {"title": "Revisar código del proyecto", "description": "Code review del PR #123", "status": "PENDING"},
            {"title": "Llamar al cliente", "description": "Discutir requerimientos del proyecto", "status": "PENDING"},
        ]
        for task in tasks:
            response = requests.post(f"{BASE_URL}/tasks", json=task)
            if response.status_code == 201:
                cls.task_ids.append(response.json()["id"])
        print(f"\nCreated {len(cls.task_ids)} test tasks for AI tests")
    
    @classmethod
    def teardown_class(cls):
        """Clean up test tasks"""
        for task_id in cls.task_ids:
            requests.delete(f"{BASE_URL}/tasks/{task_id}")
        print(f"\nCleaned up {len(cls.task_ids)} test tasks")
    
    def test_01_get_summary(self):
        """Test AI summary endpoint"""
        response = requests.get(f"{BASE_URL}/ai/summary")
        
        assert response.status_code == 200
        data = response.json()
        assert "summary" in data
        assert isinstance(data["summary"], str)
        assert len(data["summary"]) > 0
        print(f"\nAI Summary preview: {data['summary'][:200]}...")
    
    def test_02_suggest_priorities(self):
        """Test AI priority suggestions endpoint"""
        assert len(TestAIAPI.task_ids) > 0, "No task IDs available"
        
        payload = {"taskIds": TestAIAPI.task_ids}
        response = requests.post(f"{BASE_URL}/ai/priorities", json=payload)
        
        assert response.status_code == 201
        data = response.json()
        assert isinstance(data, list)
        print(f"\nPriority suggestions: {data}")
    
    def test_03_autocomplete_description(self):
        """Test AI autocomplete endpoint"""
        payload = {"title": "Preparar presentación para el cliente"}
        response = requests.post(f"{BASE_URL}/ai/autocomplete", json=payload)
        
        assert response.status_code == 201
        data = response.json()
        assert "description" in data
        assert isinstance(data["description"], str)
        assert len(data["description"]) > 0
        print(f"\nAutocomplete result: {data['description']}")
    
    def test_04_autocomplete_validation(self):
        """Test autocomplete validation: title required"""
        response = requests.post(f"{BASE_URL}/ai/autocomplete", json={})
        assert response.status_code == 400


class TestHealthCheck:
    """Basic health check tests"""
    
    def test_root_endpoint(self):
        """Test root endpoint returns Hello World"""
        response = requests.get(f"{BASE_URL}/")
        
        assert response.status_code == 200
        assert "Hello World" in response.text


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
