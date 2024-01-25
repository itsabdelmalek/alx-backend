#!/usr/bin/env python3
"""
This module provides a function for calculating pagination indexes.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate start and end indexes for pagination.

    Args:
        page (int): Page number (1-indexed).
        page_size (int): Number of items per page.

    Returns:
        Tuple of two integers representing the start and end indexes.
    """
    return ((page - 1) * page_size, page * page_size)
