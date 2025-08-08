from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ai_answer_view(request):
    """
    Protected endpoint that returns a mock AI response.
    Only accessible to authenticated users.
    """
    return Response({
        'message': 'AI says hi',
        'user': request.user.username,
        'timestamp': '2024-01-01T00:00:00Z'
    })
